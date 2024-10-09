import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // For generating verification codes

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    username: {
      type: String,
      required: [true, "Please provide your full username"],
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [40, "Username cannot exceed 40 characters"],
      lowercase: true,
      trim: true,
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email address"],
      validate: [validator.isEmail, "Please provide a valid email address"],
      unique: false, // Ensure email is unique
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [16, "Password cannot exceed 16 characters"],
      validate: {
        validator: function (value) {
          return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,16}$/.test(
            value
          );
        },
        message:
          "Password must include at least one number, one lowercase letter, one uppercase letter, and one special character",
      },
    },
    img: { type: String },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationCodeExpiry: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    // Log the error and pass it to the next middleware
    console.error("Password hashing error:", error);
    next(error);
  }
});

// Method to check if the given password is correct
userSchema.methods.isPasswordMatch = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

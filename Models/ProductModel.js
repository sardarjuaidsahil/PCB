import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // Custom error message for required field
      minLength: [10, "Title must be at least 10 characters long"],
      maxLength: [300, "Title cannot exceed 300 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"], // Custom error message for required field
      min: [0, "Price must be a positive number"], // Ensure price is positive
    },
    brand: {
      type: String, // Changed to String assuming it's a name or identifier
      default: "Unknown", // Default value for brand
    },
    image: {
      type: String,
      trim: true, // Trim the image URL to avoid leading/trailing spaces
    },
    description: {
      type: String,
      trim: true, // Trim whitespace from the description
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

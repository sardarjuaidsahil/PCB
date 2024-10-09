import Product from "../Models/ProductModel.js";

// Create a new product
export const AddProduct = async (req, res) => {
  const userData = req.body;
  try {
    const result = await Product.create(userData);
    res.status(201).json({
      success: true,
      message: "Product successfully added",
      result,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get a product by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product successfully retrieved by ID",
      result,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all products
export const getallProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Products successfully retrieved",
      products,
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get a product by ID (alternative function name could be more descriptive)
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product successfully retrieved by ID",
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product successfully updated",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a product by ID
export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
const loadCartFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("cart");
    if (serializedState === null) return { items: [] };
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

const saveCartToSessionStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Could not save cart state", err);
  }
};

// Replace localStorage with sessionStorage in the cartSlice code above.

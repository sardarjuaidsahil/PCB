import express from "express";
import {
  AddProduct,
  getProductById,
  getallProduct,
  updateProduct,
} from "../Controller/ProductController.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", AddProduct);

ProductRouter.get("/", getallProduct);

ProductRouter.get("/:id", getProductById);

ProductRouter.put("/:id", updateProduct);

export default ProductRouter;

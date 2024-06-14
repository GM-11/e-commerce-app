import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

export const productsRouter = express.Router();
productsRouter.get("/products", getProducts);
productsRouter.get("/products/:id", getProduct);
productsRouter.post("/products", addProduct);
productsRouter.put("/products/:id", updateProduct);
productsRouter.delete("/products/:id", deleteProduct);


import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { isAdmin } from "../middlewares/isAdmin";

export const productsRouter = express.Router();
productsRouter.get("/products", getProducts);
productsRouter.get("/products/:id", getProduct);
// admin only
productsRouter.post("/products", isAdmin, addProduct);
productsRouter.put("/products/:id", isAdmin, updateProduct);
productsRouter.delete("/products/:id", isAdmin, deleteProduct);

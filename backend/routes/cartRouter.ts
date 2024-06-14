import express from "express";
import {
  getCart,
  addItemToCart,
  deleteItemFromCart,
} from "../controllers/cartController";

export const cartRouter = express.Router();
cartRouter.get("/cart", getCart);
cartRouter.post("/cart", addItemToCart);
cartRouter.delete("/cart/:id", deleteItemFromCart);

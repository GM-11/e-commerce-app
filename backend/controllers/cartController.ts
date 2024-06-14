import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Product } from "../models/productModel";

export async function getCart(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        let productsInCart = [];
        for (let i = 0; i < user.cart.length; i++) {
          const product = await Product.findById(user.cart[i].productId);
          productsInCart.push({ product, quantity: user.cart[i].quantity });
        }
        res.status(200).json(productsInCart);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid Id is required" });
    }
  } catch (error) {}
}

export async function addItemToCart(req: Request, res: Response) {
  try {
    const { userId, productId, quantity } = req.body;
    if (userId && productId && quantity) {
      const user = await User.findById(userId);
      if (user) {
        const cartItem = { productId, quantity };
        let cart = user.cart.push(cartItem);
        const updatedUser = await user.updateOne({ cart });
        res.status(200).json(updatedUser.cart);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Valid Id is required" });
    }
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteItemFromCart(req: Request, res: Response) {
  try {
    const { userId, productId } = req.body;
    if (userId && productId) {
      const user = await User.findById(userId);
      if (user) {
        user.cart.filter((item) => item.productId !== productId);
        const updatedUser = await user.save();
        res.status(200).json(updatedUser.cart);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid Id is required" });
    }
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
}

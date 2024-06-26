import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Product } from "../models/productModel";

export async function getCart(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        const allProducts = await Product.find();
        let cartProducts: any[] = [];
        allProducts.forEach((product) => {
          user.cart.forEach((item: any) => {
            if (product._id == item.productId) {
              cartProducts.push(product);
            }
          });
        });
        res.status(200).json(cartProducts);
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

export async function addItemToCart(req: Request, res: Response) {
  try {
    const { userId, productId, quantity } = req.body;
    if (userId && productId && quantity) {
      const user = await User.findById(userId);
      if (user) {
        const product = await Product.findById(productId);
        if (product) {
          const cartItem = { productId, quantity };
          user.cart.push(cartItem);
          const updatedUser = await user.save();
          res.status(200).json(updatedUser.cart);
        } else {
          res.status(404).json({ message: "Product not found" });
        }
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

export async function deleteItemFromCart(req: Request, res: Response) {
  try {
    const { userId, productId } = req.body;
    if (userId && productId) {
      const user = await User.findById(userId);
      if (user) {
        const updatedCart = user.cart.filter(
          (item: any) => item.productId != productId
        );
        user.cart = updatedCart;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser.cart);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
}

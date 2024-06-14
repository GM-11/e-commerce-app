import { Request, Response } from "express";
import { Product } from "../models/productModel";

export async function getProducts(req: Request, res: Response) {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
}

//admin Only
export async function addProduct(req: Request, res: Response) {
  try {
    const { name, description, price, category } = req.body;

    const product = new Product({ name, description, price, category });
    const result = await product.save();

    if (result) res.status(201).json({ result, message: "Product addded" });
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { updatedField, updatedValue } = req.body;
    let updatedData = {};
    switch (updatedField) {
      case "name":
        updatedData = { name: updatedValue };
        break;
      case "description":
        updatedData = { description: updatedValue };
        break;
      case "price":
        updatedData = { price: updatedValue };
        break;
      case "category":
        updatedData = { category: updatedValue };
        break;
      default:
        res.status(400).json({ message: "Invalid field to update" });
        return;
    }

    const result = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (result) {
      res.status(201).json({ result, message: "Product updated" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
} // admin Only

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200).json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    console.log("Error occured", error);
    res.status(500).json({ error: error.message });
  }
} // admin Only

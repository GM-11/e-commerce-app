import mongoose from "mongoose";
import { CartItem } from "./cartItemModel";

export const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cart: [
    {
      type: Object,
      required: true,
      ref: CartItem,
    },
  ],
});

export const User = mongoose.model("User", userSchema);

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { generateToken } from "../middlewares/isAuthorized";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    // encrypting password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      isAdmin: name === "admin",
    });
    const token = generateToken(newUser.id);

    res.cookie("token", token, {
      httpOnly: true,
    });

    const result = await newUser.save();

    if (result)
      res.status(201).json({ result, message: "User registered successfully" });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // check if user exists
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error: any) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: error.message });
  }
}

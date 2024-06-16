import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    // cosnt
    const user = await User.findById(req.body.userId);
    if (user) {
      if (!user.isAdmin) {
        res.status(403).json({ error: "Access Denied" });
        return;
      }

      next();
    } else {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Some error occured" });
    return;
  }
}

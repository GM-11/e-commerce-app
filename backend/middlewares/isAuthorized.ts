import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function generateToken(userId:string) {
  return jwt.sign({userId}, "secretKey",   {expiresIn: 3 * 24 * 60 * 60})
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")
  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }
  try {
    const verified = jwt.verify(token, "secretkey");
    req.body.userId = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

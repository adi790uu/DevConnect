import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ExtendedRequest extends Request {
  user?: JwtPayload;
}
const authenticateUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_JWT as string
    ) as JwtPayload;
    req.user = decoded;
    console.log("Token verified successfully:", decoded);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default authenticateUser;

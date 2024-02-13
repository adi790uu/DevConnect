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
      console.error("Authentication failed: Token missing");
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    console.log("Token verified successfully:", decoded);

    next();
  } catch (error) {
    console.error("Token verification failed:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }

    return res.status(401).json({ error: "Authentication failed" });
  }
};

export default authenticateUser;

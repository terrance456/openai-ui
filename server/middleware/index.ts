import { Request, Response, NextFunction } from "express";
import { admin } from "../auth/firebase-config";
import { validateEmail } from "../routes/firebase/firebase-queries";

export class Middleware {
  async decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Bad Request" });
      }

      try {
        const verifyToken = await admin.auth().verifyIdToken(token);

        if (!verifyToken) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        if (!(await validateEmail({ email: verifyToken.email as string, userId: verifyToken.uid }))) {
          res.status(400).json({ message: "Bad Request" });
          return;
        }

        res.locals.user = verifyToken;

        return next();
      } catch (e) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

const admin = require("../auth/firebase-config");

class Middleware {
  async decodeToken(req, res, next, auth) {
    try {
      const token = auth ? req.headers?.authorization?.split(" ")[1] : req.cookies.secret?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "Bad Request" });
      }

      try {
        const verifyToken = await admin.auth().verifyIdToken(token);
        if (!verifyToken) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return next();
      } catch (e) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new Middleware();

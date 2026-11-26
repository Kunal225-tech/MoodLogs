const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.userId;

      next();

    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token invalid or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No authorization token provided" });
  }
};

module.exports = { protect };
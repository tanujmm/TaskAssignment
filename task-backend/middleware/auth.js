import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

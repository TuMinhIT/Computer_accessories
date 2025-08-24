import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; 
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ success: false, message: "Invalid or expired token" });

      req.user = decoded; 
      next();
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authUser;

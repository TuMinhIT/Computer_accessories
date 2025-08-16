import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;

// import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.send({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const decode = jwt.verify(token, process.env.JWT_SECRET);

//     if (decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       next();
//     } else {
//       return res.send({
//         success: false,
//         message: "Unauthorized",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.send({
//       success: false,
//       message: "Unauthorized",
//     });
//   }
// };

// export default adminAuth;

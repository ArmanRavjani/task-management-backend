import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
}

export { authUserMiddleware };

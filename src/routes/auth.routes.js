import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  checkAuth,
} from "../controllers/auth.controller.js";
import multer from "multer";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
router.put(
  "/user/update-profile",
  authUserMiddleware,
  upload.single("profilePic"),
  updateUser,
);
router.get("/user/check", authUserMiddleware, checkAuth);
export { router as authRouter };

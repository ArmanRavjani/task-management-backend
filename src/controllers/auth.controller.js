import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../services/cloudinary.js";
async function registerUser(req, res) {
  const { userName, email, password, bio } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User Registered Successfully",
    user: {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Email Or Password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User logged In Successfully",
    user: {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logout Successfully",
  });
}

async function updateUser(req, res) {
  const { userName, bio } = req.body;
  const userId = req.user._id;
  let updatedUser;
  const profilePic = req.file ? req.file.path : null;
  // console.log(req.file);

  if (!profilePic) {
    updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { userName, bio },
      { returnDocument: "after" },
    );
  } else {
    const upload = await cloudinary.uploader.upload(profilePic);
    // console.log(upload);

    updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { userName, bio, profilePic: upload.secure_url },
      { returnDocument: "after" },
    );
  }

  res.status(201).json({
    message: "User Updated Successfully",
    user: updatedUser,
  });
}

async function checkAuth(req, res) {
  res.json({
    success: true,
    user: req.user,
  });
}
export { registerUser, loginUser, logoutUser, updateUser, checkAuth };

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username must be required"],
    },
    email: {
      type: String,
      required: [true, "email must be required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password must be required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;

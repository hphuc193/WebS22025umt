// import mongoose from "mongoose";
// let Schema = mongoose.Schema;
// let String = Schema.Types.String;

// export const UserSchema = new Schema(
//   {
//     username: String,
//   },
//   {
//     collection: "users",
//   }
// );

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  {
    collection: "users",
    timestamps: true, // Lưu thời gian tạo & cập nhật
  }
);

// Hash password trước khi lưu
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", UserSchema);

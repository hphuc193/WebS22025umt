import mongoose from "mongoose";
let model = mongoose.model;

import { CategorySchema } from "./category.js";
import { UserSchema } from "./user.js";
import { SouvenirSchema } from "./souvenir.js";
import { MotorbikeSchema } from "./motorbikes.js"; // Thêm MotorbikeSchema

export const Category = mongoose.model("category", CategorySchema);
export const User = model("user", UserSchema);
export const Souvenir = model("souvenir", SouvenirSchema);
export const Motorbike = model("motorbike", MotorbikeSchema); // Thêm Motorbike
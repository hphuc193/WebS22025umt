import mongoose from "mongoose";

let Schema = mongoose.Schema;
let String = Schema.Types.String;
let Number = Schema.Types.Number;

export const MotorbikeSchema = new Schema(
  {
    stt: { type: Number, required: true },
    name: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [{ type: String }], // Mảng các chuỗi để lưu đường dẫn ảnh
  },
  {
    collection: "motorbikes",
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

export const Motorbike = mongoose.model("Motorbike", MotorbikeSchema);
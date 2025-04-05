import mongoose from "mongoose"; 

let Schema = mongoose.Schema;
let String = Schema.Types.String;
let Number = Schema.Types.Number;

export const SouvenirSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }
  },
  {
    collection: "souvenirs",
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

export const Souvenir = mongoose.model("Souvenir", SouvenirSchema);

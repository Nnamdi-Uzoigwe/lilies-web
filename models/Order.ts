import mongoose, { Schema, models } from "mongoose";

const OrderItemSchema = new Schema({
  id: String,
  name: String,
  image: String,
  price: String,
  quantity: Number,
});

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  items: [OrderItemSchema],
  total: Number,
  reference: { type: String, unique: true },
  status: { type: String, default: "paid" },
  createdAt: { type: Date, default: Date.now },
});

export const Order = models.Order || mongoose.model("Order", OrderSchema);
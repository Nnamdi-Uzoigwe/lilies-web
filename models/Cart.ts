import mongoose, { Schema, models } from "mongoose";

const CartItemSchema = new Schema({
  id: String,
  name: String,
  image: String,
  price: String,
  quantity: Number,
});

const CartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [CartItemSchema],
});

export const Cart = models.Cart || mongoose.model("Cart", CartSchema);
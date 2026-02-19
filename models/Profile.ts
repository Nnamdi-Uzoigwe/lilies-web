import mongoose, { Schema, models } from "mongoose";

const ProfileSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  notes: String,
});

export const Profile = models.Profile || mongoose.model("Profile", ProfileSchema);
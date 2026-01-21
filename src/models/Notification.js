import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    receiverRole: { type: String, required: true },
    receiverEmail: { type: String },
    message: { type: String, required: true },
    type: { type: String, default: "info" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

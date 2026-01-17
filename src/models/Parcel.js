import mongoose from "mongoose";

const ParcelSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    senderInfo: {
      name: { type: String, required: true },
      address: { type: String, required: false },
      phone: { type: String, required: true },
      email: String,
    },
    receiverInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
    },
    description: String,
    weight: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "picked", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: ["pending", "picked", "in-transit", "delivered", "cancelled"],
        },
        timestamp: { type: Date, default: Date.now },
        note: String,
      },
    ],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedAgentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Parcel || mongoose.model("Parcel", ParcelSchema);

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Electronics", "Fashion", "Service", "Software", "Other"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

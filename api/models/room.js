import mongoose from "mongoose";

// Defining app schema
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
    },
    maxPeople: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", RoomSchema);

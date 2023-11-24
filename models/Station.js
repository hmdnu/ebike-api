import { Schema, model } from "mongoose";

const StationSchema = new Schema({
  station: Number,
  bike: [
    {
      bikeCode: Number,
      isRented: { type: Boolean, default: false },
    },
  ],
});

const Station = model("Station", StationSchema);
export default Station;

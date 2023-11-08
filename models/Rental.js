import { Schema, model } from "mongoose";

const RentalSchema = new Schema({
  renter: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  bikeCode: {
    type: Number,
    required: true,
  },

  station: {
    type: Number,
    required: true,
  },

  status: {
    type: Boolean,
    default: false,
  },

  pickUpTime: {
    type: String,
    required: true,
  },

  dateRent: {
    type: String,
    required: true,
  },
});

const Rental = model("Rental", RentalSchema);
export default Rental;

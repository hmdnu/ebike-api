import Rental from "../models/Rental.js";
import Station from "../models/Station.js";

async function promiseResolver(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
}

export async function createRental(req, res) {
  const { renter, bikeCode, station, isRented, pickUpTime, dateRent } = req.body;

  const rental = await Rental.create({
    renter,
    bikeCode,
    station,
    isRented,
    pickUpTime,
    dateRent,
  });

  const [data, error] = await promiseResolver(rental);

  if (data) {
    console.log(data);
    return res.status(200).json({ renter: rental, message: "rental success", success: true });
  }
  if (error) return res.status(500).json({ message: "failed to rental", success: false });
}

export async function getRental(req, res) {
  const rental = await Rental.find().populate("renter");
  const [data, error] = await promiseResolver(rental);

  if (data) return res.status(200).json({ rental, message: "fetching rental success", success: true });
  if (error) return res.status(500).json({ message: "failed to fetch", success: false });
}

export async function getIndividualRenters(req, res) {
  const { id } = req.params;

  const renter = await Rental.findById(id);
  const [data, error] = await promiseResolver(renter);
  console.log(renter);

  if (data) return res.status(200).json({ renter, message: "fetching renters success", success: true });
  if (error) return res.status(500).json({ message: "failed to fetch", success: false });
}

export async function updateRental(req, res) {
  const { bikeCode, station, isRented, pickUpTime, dateRent } = req.body;
  const { id } = req.params;

  const rental = await Rental.findByIdAndUpdate(id, {
    bikeCode,
    station,
    isRented,
    pickUpTime,
    dateRent,
  });

  const [data, error] = await promiseResolver(rental);
  if (data) return res.status(200).json({ message: "update renters success", success: true });
  if (error) return res.status(500).json({ message: "failed to update renters", success: false });
}

export async function deleteUserHistoryRental(req, res) {
  const { id } = req.params;

  // const bike = await Rental.findOne();
  console.log(id);
}

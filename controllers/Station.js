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

export async function getStation(req, res) {
  const station = await Station.find();

  const [data, error] = await promiseResolver(station);

  if (data)
    return res.status(200).json({ station, message: "fetch station success", success: true });
  if (error) return res.status(500).json({ message: "fetch station failed", success: false });
}

export async function createStation(req, res) {
  const { station, bike } = req.body;
  const stations = await Station.create({ station, bike });

  const [data, error] = await promiseResolver(stations);

  if (data) return res.json({ stations, message: "station created successfully", success: true });
  if (error) return res.json({ message: "error" });
}

export async function updateStation(req, res) {
  const { station, bikecode } = req.params;
  const { isRented } = req.body;

  const bikes = await Station.findOne({ station });

  const [data, error] = await promiseResolver(bikes);

  if (data) {
    const statusBike = data.bike.find((bike) => bike.bikeCode === parseInt(bikecode));

    if (statusBike) {
      statusBike.isRented = isRented;
      await bikes.save();

      return res
        .status(200)
        .json({ statusBike, message: "update isRented bike success", success: true });
    }
  }
  if (error) return res.status(500).json({ message: "update station failed", success: false });
}

export async function getIndividualBike(req, res) {
  const { id } = req.params;

  const bike = await Station.findById(id);

  const [data, error] = await promiseResolver(bike);

  if (data) return res.status(200).json({ bike, message: "fetch station success", success: true });
  if (error) return res.status(500).json({ message: "fetch station failed", success: false });
}

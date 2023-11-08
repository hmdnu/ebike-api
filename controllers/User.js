import User from "../models/User.js";
import { createToken } from "../utils/token.js";

async function promiseResolver(promise) {
  try {
    const data = await promise;

    return [data, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
}

export async function getUser(req, res) {
  const users = await User.find();

  const [data, error] = await promiseResolver(users);

  if (data) return res.status(200).json({ users, message: "fetch users success", success: true });
  if (error) res.status(500).json({ message: "failed to fetch users", success: false });
}

export async function createUser(req, res) {
  const { nim, nama, password, jurusan, prodi, noHp } = req.body;

  const user = await User.create({ nim, nama, password, jurusan, prodi, noHp });
  const [data, error] = await promiseResolver(user);

  if (data) return res.status(200).json({ user, message: "create user success", success: true });
  if (error) return res.status(500).json({ message: "cant create user", success: false });
}

export async function login(req, res) {
  const { nim, password } = req.body;

  async function auth() {
    const user = await User.findOne({ nim });
    if (!user) return res.status(401).json({ message: "user not found", success: false });

    if (password === user.password) {
      const token = createToken(user._id);
      return res.status(200).json({ user, token, message: "login success", success: true });
    }
    return res.status(401).json({ message: "password incorrect", success: false });
  }

  const [data, error] = await promiseResolver(auth);

  if (data) return await auth();
  if (error) return res.status(501).json({ message: "cant login", success: false });
}

export async function getIndividualUser(req, res) {
  const { id } = req.params;

  const user = await User.findById(id);

  const [data, error] = await promiseResolver(user);

  if (data) res.status(200).json({ user, message: "fetch user success", success: true });
  if (error) return res.status(501).json({ message: "cant fetch user", success: false });
}

export async function editUser(req, res) {
  const { id } = req.params;
  const { bikeCode, station, pickUpTime, dateRent } = req.body;

  console.log("id", id);
  console.log(req.body);

  // const user = await User.findByIdAndUpdate(id, {
  //   bikeCode,
  //   station,
  //   pickUpTime,
  //   dateRent,
  // });

  // const [data, error] = await promiseResolver(user);
}

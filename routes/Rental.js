import express from "express";

import { getRental, createRental, updateRental, getIndividualRenters } from "../controllers/Rental.js";

const router = express.Router();

router.get("/", getRental);
router.get("/:id", getIndividualRenters);
router.post("/new", createRental);
router.patch("/update/:id", updateRental);

export default router;

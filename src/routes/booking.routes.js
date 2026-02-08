import { Router } from "express";
import { createBooking, deleteBooking } from "../controllers/booking.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createBookingSchema } from "../validators/booking.validators.js";

const router = Router();

router.post("/", requireAuth, validate(createBookingSchema), createBooking);
router.delete("/:id", requireAuth, deleteBooking);

export default router;

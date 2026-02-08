import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/users.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { updateProfileSchema } from "../validators/user.validators.js";

const router = Router();

router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, validate(updateProfileSchema), updateProfile);

export default router;

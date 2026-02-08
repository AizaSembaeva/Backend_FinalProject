import { Router } from "express";
import { createService, deleteService, getServices, getServiceById, updateService } from "../controllers/service.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";
import { validate } from "../middleware/validate.js";
import { createServiceSchema, updateServiceSchema } from "../validators/service.validators.js";

const router = Router();

router.get("/", getServices);
router.get("/:id", getServiceById);

router.post("/", requireAuth, requireAdmin, validate(createServiceSchema), createService);
router.put("/:id", requireAuth, requireAdmin, validate(updateServiceSchema), updateService);
router.delete("/:id", requireAuth, requireAdmin, deleteService);

export default router;

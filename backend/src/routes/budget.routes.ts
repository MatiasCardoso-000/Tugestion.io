import { Router } from "express";
import { budgetSchema } from "../schemas/budget.schema";
import { validateSchema } from "../middleware/validateSchema";
import { validateToken } from "../middleware/validateToken";
import { budgetController } from "../controllers/budget.controllers";

export const router = Router();

router.post(
  "/",
  validateToken,
  validateSchema(budgetSchema),
  budgetController.setBudget
);


router.get("/", validateToken, budgetController.getAllBudgets);

router.put("/", validateToken, budgetController.updateBudget);

router.delete("/:id", validateToken, budgetController.deleteBudget);

import { Router } from "express";
import { CategoryController } from "../controllers/category.controllers";
import { validateToken } from "../middleware/validateToken";

export const router = Router();

router.post("/", validateToken, CategoryController.createCategory);
router.get(
  "/",
  validateToken,
  CategoryController.getCategoriesByUser
);
router.put(
  "/categories/:id",
  validateToken,
  CategoryController.updateCategory
);
router.delete(
  "/categories/:id",
  validateToken,
  CategoryController.deleteCategory
);
import { Router } from "express";
import { CategoryController } from "../controllers/category.controllers";
import { validateToken } from "../middleware/validateToken";
export var router = Router();
router.post("/", validateToken, CategoryController.createCategory);
router.get("/", validateToken, CategoryController.getCategoriesByUser);
router.put("/:id", validateToken, CategoryController.updateCategory);
router.delete("/:id", validateToken, CategoryController.deleteCategory);

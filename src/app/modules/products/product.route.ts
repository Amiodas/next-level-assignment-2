import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// will call controller function
router.post("/products", ProductControllers.createProduct);
router.get("/products", ProductControllers.getAllProduct);
router.get("/products/:productId", ProductControllers.getSingleProductByID);
router.get("/products/:productId", ProductControllers.updateProduct);

export const ProductRoutes = router;

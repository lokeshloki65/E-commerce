import express from "express";
import Product from "../model/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// GET all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("GET /api/products request received");
    const products = await Product.find({});
    // throw new Error("Test Error");
    console.log("Products found:", products.length);
    res.json(products);
  })
);

// GET a single product by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;

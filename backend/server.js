import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/ErrorMiddleware.js";

const app = express();
const port = 5000;

// In your server.js/app.js
app.use(
  cors({
    origin: "http://localhost:5173", // or whatever port your frontend runs on
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res, next) => {
  console.log("Home Page");
  res.send("Home Page");
  next();
});

app.use("/api/products", productRoutes);

app.use(errorHandler);
app.use(notFound);
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import colors from "colors";
import { errorHandler, notFound } from "./middleware/errorMiddleWare.js";
import uploadRouter from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
connectDB();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use("/api/upload", uploadRouter);
app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `server starts in ${process.env.NODE_ENV} mode on: http://localhost:${port}`
  )
);

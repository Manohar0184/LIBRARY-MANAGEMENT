import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

//Global Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req,res) => {
    res.json({
        success: true,
        message:"Library API is running"
    })
});

// API Routes
app.use("/api/books", bookRoutes)

// Error Middleware
app.use(errorHandler);

export default app;
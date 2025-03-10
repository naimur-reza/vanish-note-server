import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { pollRoutes } from "./routes/poll.routes";
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB(); // Connect to MongoDB when the server starts

app.use("/api/polls", pollRoutes);

// Routes
app.get("/", (_, res) => {
  res.json({
    message: "✅ Vanish Vote Server is running. ^_^",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

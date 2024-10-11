// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import responseTime from "response-time";
import routes from "./Paths";
// Load environment variables
dotenv.config();

// Initialize Express and HTTP server
const app = express();

// Configure CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Use environment variable if available
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(responseTime());

// Serve static files
app.use("/media", express.static("uploadFile"));

// Register routes dynamically
for (const route of routes) {
  app.use("/api/v1", route);
}

// Define a simple GET route for the root
app.get("/linkShare", async (_req, res) => {
  res.send("HELLO! Link Share App.");
});

//error middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.message);
  res.status(400).json({ message: err.message });
});

// Start server
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

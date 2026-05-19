import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const { default: enquiryRoutes } = await import("./routes/routes.js");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", enquiryRoutes);

app.get("/", (req, res) => {
  res.send("SAP Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "LOADED" : "MISSING");
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const vendorProductRoutes = require("./routes/vendorProductRoutes");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

// Fix for Node.js querySrv ECONNREFUSED issues on local ISP DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // maximum 100 requests
    message: "Too many requests, please try again later."
});

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vendor", vendorProductRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error.message);
    });

// Home route
app.get("/", (req, res) => {
    res.send("🚀 NexusCart Backend is Running...");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "NexusCart backend is healthy"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

// CORS middleware
app.use(cors({
    origin: "https://pos-restaurant-system.vercel.app", // allow your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Routes
app.use("/api/restaurants", require("./modules/restaurant/restaurant.routes"));

module.exports = app;

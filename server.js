const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/error");

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goal"));
app.use("/api/users", require("./routes/user"));

app.use(errorHandler); // order matters for the middlewares

app.listen(PORT, () => console.log(`server is running at ${PORT}`));

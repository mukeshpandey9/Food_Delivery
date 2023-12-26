const express = require("express");
const mongoDB = require("./db");
const app = express();
const dotenv = require("dotenv").config();
const port = 8080;

// Config
// dotenv.config();
// Mongodb Connection
mongoDB();

app.use(express.json());

// Api

app.use("/api/v1/user", require("./routes/userRoutes"));

app.use("/api/v1/user", require("./routes/DisplayData"));

app.use("/api/v1/user", require("./routes/orderData"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

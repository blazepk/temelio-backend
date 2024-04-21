require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const nonprofitsRouter = require("./routes/non-profits");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send(
    '<h1>Store API</h1><a href="/api/v1/non-profits">products route</a>'
  );
});

app.use("/api/v1/non-profits", nonprofitsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

require("dotenv").config();
require("express-async-errors");
const bodyParser = require("body-parser");

const nonprofitsRouter = require("./routes/non-profits");
const foundationRouter = require("./routes/foundation");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes

app.get("/", (req, res) => {
  res.send(
    '<h1>Store API</h1><a href="/api/v1/non-profits">products route</a>'
  );
});

app.use("/api/v1/non-profits", nonprofitsRouter);
app.use("/api/v1/foundation", foundationRouter);

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

const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router")

const app = express();

// const corsOptions = {
//     origin: ["https://playlist-manager-admin.herokuapp.com", "https://playlist-manager-user.herokuapp.com"],
//     credentials: true
// }

// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const port = process.env.S_PORT || 3000;

app.listen(port, () =>
  console.log(`Example app is listening on port ${port}.`)
);

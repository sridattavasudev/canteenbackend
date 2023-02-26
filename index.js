require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT;
app.use(cors());

const orderRoute = require("./routes/Orders");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection sucessful to data base"))
  .catch((err) => console.log(err));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/", orderRoute);
app.listen(port, () => console.log(`server running on port ${port}`));

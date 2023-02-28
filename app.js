const express = require("express");
const app = express();
const port = process.env.PORT || 9000;

const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

const cors = require("cors");

require("./models/Schema");
app.use(express.json());
app.use(require("./routes/Route"));

//cors block so as to not fuck up in the future

const corsOptions = {
  origin: true,
  credentials: true,
};
app.options("*", cors(corsOptions));

//mongo db block

mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("DB connected.");
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});

//node boilerplate

app.get("/", (req, res) => {

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, UPDATE, PUT, PATCH"
  );

  console.log("the server was triggered");
  res.send("Yes, the server was triggered");
});

app.listen(port, () => {
  console.log("Yea, the server is livin' at port whatevs");
});

/*
put this between the get response and use method if cors error appears
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/

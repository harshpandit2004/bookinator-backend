const express = require("express");
const app = express();
const port = process.env.PORT || 9000;
const Schema = require("./models/Schema");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const cors = require("cors");

require("./models/Schema");
app.use(express.json());

//cors block so as to not fuck up in the future
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//mongo db block

mongoose.set("strictQuery", true);
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

app.get("/getbooklist", (req, res) => {
  Schema.find()
    .then((stuff) => {
      res.send(stuff);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/addbook", (req, res) => {
  const { genre, name, author, coverimg, pirate_link, summary } = req.body;
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (!author && !name) {
    return res
      .status(422)
      .json({ error: "insufficient data, please add all the feilds." });
  }

  const listEntry = new Schema({
    genre,
    name,
    author,
    coverimg,
    pirate_link,
    summary,
  });

  listEntry
    .save()
    .then((entry) => {
      res.json({ message: "saved successfully" });
      console.log("Entry added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("Yea, the server is livin' at port whatevs");
});
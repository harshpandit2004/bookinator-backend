const express = require("express");
const router = express.Router();

const Schema = require("../models/Schema");

router.get("/getbooklist", (req, res) => {
  res.set("Access-Control-Allow-Origin", "GET");
  res.set("Access-Control-Allow-Headers", "GET");
  res.set("Access-Control-Allow-Methods", "GET");

  Schema.find()
    .then((stuff) => {
      res.send(stuff);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addbook", (req, res) => {
  res.set("Access-Control-Allow-Origin", "POST");
  res.set("Access-Control-Allow-Headers", "POST");
  res.set("Access-Control-Allow-Methods", "POST");

  const { genre, name, author, coverimg, pirate_link, summary } = req.body;

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

module.exports = router;

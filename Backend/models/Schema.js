const mongoose = require("mongoose");

const Schema = {
  genre: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
  },
  coverimg: {
    type: String,
  },
  pirate_link: {
    type: String,
  },
  summary: {
    type: String,
  },
};

module.exports = mongoose.model("Schema", Schema)
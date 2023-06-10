const mongoose = require("mongoose");

const connection = mongoose.connect(
   "mongodb+srv://hmahilange:mahilange@cluster0.m6psgpm.mongodb.net/calculator?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};

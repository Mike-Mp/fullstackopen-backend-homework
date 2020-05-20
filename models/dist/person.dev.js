"use strict";

var mongoose = require("mongoose");

var url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (res) {
  console.log("connected to mongodb");
})["catch"](function (err) {
  return console.log("error connecting", err.message);
});
var personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String
});
personSchema.set("toJSON", {
  transform: function transform(document, returnedObj) {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});
module.exports = mongoose.model("Person", personSchema);
"use strict";

var mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log('Please enter a password. Like "node mongo.js $password$"');
  process.exit(1);
}

var password = process.argv[2];
var url = "mongodb+srv://fullstack:".concat(password, "@cluster0-cndmu.mongodb.net/person-app?retryWrites=true&w=majority");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var PersonSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String
});
var Person = mongoose.model("Person", PersonSchema);
var name;
var number;

if (process.argv.length === 3) {
  Person.find({}).then(function (result) {
    result.forEach(function (person) {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  name = process.argv[3];
  number = process.argv[4];
  var newPerson = new Person({
    name: name,
    number: number,
    date: new Date()
  });
  newPerson.save().then(function (res) {
    console.log("added ".concat(name, " number ").concat(number, " to phonebook"));
    mongoose.connection.close();
  });
}
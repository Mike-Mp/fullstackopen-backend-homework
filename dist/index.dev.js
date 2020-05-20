"use strict";

require("dotenv").config();

var express = require("express");

var app = express();

var cors = require("cors");

var Person = require("./models/person");

app.use(cors());
app.use(express["static"]("build"));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  var morgan = require("morgan");

  morgan.token("type", function (req, res) {
    return JSON.stringify(res.body);
  });
  app.use(morgan("type"));
}

app.get("/", function (req, res) {
  res.send("Hello world");
});
app.get("/api/persons", function _callee(req, res) {
  var people;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Person.find({}));

        case 2:
          people = _context.sent;
          res.json(people);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/api/persons/:id", function _callee2(req, res) {
  var person;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Person.findById(req.params.id));

        case 2:
          person = _context2.sent;
          res.json(person);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get("/info", function (req, res) {
  var personNum = persons.length;
  res.send("Phonebook has info for ".concat(personNum, " people.\n ").concat(new Date().toString()));
});
app.post("/api/persons", function (req, res) {
  var body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({
      error: "name is missing"
    });
  }

  var newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  });
  newPerson.save().then(function (savedPerson) {
    res.json(savedPerson);
  });
});
app["delete"]("/api/persons/:id", function (req, res) {
  var id = Number(req.params.id);
  var person = persons.find(function (p) {
    return p.id === id;
  });

  if (!person) {
    res.status(404).end();
  }

  persons = persons.filter(function (p) {
    return p !== person;
  });
  res.status(204).end();
});

var unknownEndpoint = function unknownEndpoint(req, res) {
  res.status(404).send({
    error: "unknown endpoint"
  });
};

app.use(unknownEndpoint);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("App is listening on port ".concat(PORT));
});
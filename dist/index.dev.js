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
app.get("/api/persons/:id", function (req, res, next) {
  Person.findById(req.params.id).then(function (note) {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  })["catch"](function (error) {
    next(error);
  });
});
app.get("/info", function (req, res) {
  Note.find({}).then(function (result) {
    return res.send("Phonebook has info for ".concat(result.length, " people.\n ").concat(new Date().toString()));
  });
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
app.put("/api/persons/:id", function (req, res, next) {
  var body = req.body;
  var person = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    "new": true
  }).then(function (modifiedPerson) {
    return res.json(modifiedPerson);
  });
});
app["delete"]("/api/persons/:id", function (req, res, next) {
  Person.findByIdAndDelete(req.params.id).then(function (result) {
    return res.status(204).end();
  })["catch"](function (error) {
    return next(error);
  });
});

var errorHandler = function errorHandler(error, req, res, next) {
  if (error.name === "CastError") {
    return res.status(400).send({
      error: "malformatted id"
    });
  } else {
    next(error);
  }
};

app.use(errorHandler);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("App is listening on port ".concat(PORT));
});
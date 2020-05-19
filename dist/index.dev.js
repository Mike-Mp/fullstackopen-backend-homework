"use strict";

var express = require("express");

var app = express();

var morgan = require("morgan");

var cors = require("cors");

app.use(cors());
app.use(express.json());
morgan.token("type", function (req, res) {
  return JSON.stringify(res.body);
});
app.use(morgan("type"));
var persons = [{
  name: "George",
  id: 1
}, {
  name: "Smith",
  id: 2
}, {
  name: "Mike",
  id: 3
}, {
  name: "Bill",
  id: 4
}];
app.get("/", function (req, res) {
  res.send("Hello world");
});
app.get("/api/persons", function (req, res) {
  res.json(persons);
});
app.get("/api/persons/:id", function (req, res) {
  var id = Number(req.params.id);
  var person = persons.find(function (p) {
    return p.id === id;
  });

  if (!person) {
    return res.status(404).end();
  }

  res.json(person);
});
app.get("/info", function (req, res) {
  var personNum = persons.length;
  res.send("Phonebook has info for ".concat(personNum, " people.\n ").concat(new Date().toString()));
});
app.post("/api/persons", function (req, res) {
  var id = Math.floor(Math.random() * 100);
  var body = req.body;
  var personExist = persons.find(function (p) {
    return p.name === body.name;
  });
  var newPerson = {
    name: body.name,
    id: id
  };

  if (!body.name) {
    return res.status(304).json({
      error: "Name has to be included."
    });
  } else if (personExist) {
    return res.status(304).json({
      error: "Name already exists"
    });
  }

  persons = persons.concat(newPerson);
  res.json(newPerson);
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
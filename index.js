require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());

app.use(express.static("build"));

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  morgan.token("type", function (req, res) {
    return JSON.stringify(res.body);
  });

  app.use(morgan("type"));
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/persons", async (req, res) => {
  const people = await Person.find({});
  res.json(people);
});

app.get("/api/persons/:id", async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.json(person);
});

app.get("/info", (req, res) => {
  const personNum = persons.length;

  res.send(
    `Phonebook has info for ${personNum} people.\n ${new Date().toString()}`
  );
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: "name is missing" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    res.status(404).end();
  }
  persons = persons.filter((p) => p !== person);
  res.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

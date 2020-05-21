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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (req, res) => {
  Note.find({}).then((result) =>
    res.send(
      `Phonebook has info for ${
        result.length
      } people.\n ${new Date().toString()}`
    )
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

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
  }).then((modifiedPerson) => res.json(modifiedPerson));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else {
    next(error);
  }
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

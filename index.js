const express = require("express");
const app = express();

app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path", req.path);
  console.log("Body", req.body);
  console.log("---");
  next();
};

app.use(requestLogger);

let persons = [
  {
    name: "George",
    id: 1,
  },
  {
    name: "Smith",
    id: 2,
  },
  {
    name: "Mike",
    id: 3,
  },
  {
    name: "Bill",
    id: 4,
  },
];

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.get("/info", (req, res) => {
  const personNum = persons.length;

  res.send(
    `Phonebook has info for ${personNum} people.\n ${new Date().toString()}`
  );
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 100);
  const body = req.body;
  const personExist = persons.find((p) => p.name === body.name);

  const newPerson = {
    name: body.name,
    id,
  };

  if (!body.name) {
    return res.status(304).json({
      error: "Name has to be included.",
    });
  } else if (personExist) {
    return res.status(304).json({
      error: "Name already exists",
    });
  }

  persons = persons.concat(newPerson);
  res.json(newPerson);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log('Please enter a password. Like "node mongo.js $password$"');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0-cndmu.mongodb.net/person-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const PersonSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
});

const Person = mongoose.model("Person", PersonSchema);

let name;
let number;

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });

    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  name = process.argv[3];
  number = process.argv[4];
  const newPerson = new Person({
    name,
    number,
    date: new Date(),
  });

  newPerson.save().then((res) => {
    console.log(`added ${name} number ${number} to phonebook`);

    mongoose.connection.close();
  });
}

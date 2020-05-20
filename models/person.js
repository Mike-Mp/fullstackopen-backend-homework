const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log("error connecting", err.message));

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);

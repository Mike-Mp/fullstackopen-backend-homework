"use strict";var mongoose=require("mongoose");process.argv.length<3&&(console.log('Please enter a password. Like "node mongo.js $password$"'),process.exit(1));var password=process.argv[2],url="mongodb+srv://fullstack:".concat(password,"@cluster0-cndmu.mongodb.net/person-app?retryWrites=true&w=majority");mongoose.connect(url,{useNewUrlParser:!0,useUnifiedTopology:!0});var name,number,PersonSchema=new mongoose.Schema({name:String,date:Date,number:String}),Person=mongoose.model("Person",PersonSchema);if(3===process.argv.length&&Person.find({}).then(function(e){e.forEach(function(e){console.log(e)}),mongoose.connection.close()}),5===process.argv.length){name=process.argv[3],number=process.argv[4];var newPerson=new Person({name:name,number:number,date:new Date});newPerson.save().then(function(e){console.log("added ".concat(name," number ").concat(number," to phonebook")),mongoose.connection.close()})}
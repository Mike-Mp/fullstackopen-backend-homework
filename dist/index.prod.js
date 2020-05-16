"use strict";var express=require("express"),app=express();app.use(express.json());var requestLogger=function(e,n,o){console.log("Method:",e.method),console.log("Path",e.path),console.log("Body",e.body),console.log("---"),o()};app.use(requestLogger);var persons=[{name:"George",id:1},{name:"Smith",id:2},{name:"Mike",id:3},{name:"Bill",id:4}];app.get("/",function(e,n){n.send("Hello world")}),app.get("/api/persons",function(e,n){n.json(persons)}),app.get("/api/persons/:id",function(e,n){var o=Number(e.params.id),s=persons.find(function(e){return e.id===o});if(!s)return n.status(404).end();n.json(s)}),app.get("/info",function(e,n){var o=persons.length;n.send("Phonebook has info for ".concat(o," people.\n ").concat((new Date).toString()))}),app.post("/api/persons",function(e,n){var o=Math.floor(100*Math.random()),s=e.body,r=persons.find(function(e){return e.name===s.name}),t={name:s.name,id:o};return s.name?r?n.status(304).json({error:"Name already exists"}):(persons=persons.concat(t),void n.json(t)):n.status(304).json({error:"Name has to be included."})}),app.delete("/api/persons/:id",function(e,n){var o=Number(e.params.id),s=persons.find(function(e){return e.id===o});s||n.status(404).end(),persons=persons.filter(function(e){return e!==s}),n.status(204).end()});var PORT=3001;app.listen(PORT,function(){console.log("App is listening on port ".concat(PORT))});

const express = require('express');
const data = require('./data.json');
const path = require('path');

const app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

// route to homepage

app.get("/", (req, res) => {
    res.render("index", {projects: data.projects} )
});

//route to about page

app.get("/about", (req, res) => {
    res.render("about" ) 
});

//route to project page

app.get("/projects/:id", (req, res) =>{
    const id = req.params.id;
    const project = data.projects.find( p => p.id === parseInt(id))
    res.render("project", { project });
});

//404 error handler

app.use((req, res, next)  => {
    const error = new Error("Page not found");
    error.status = 404;
    error.message = "Uh oh, we couldn't find that page."
    console.log(`${error.status} - ${error.message}`)
    next(error);
});

//Global error handler

app.use((err, req, res, next) => {
  const error =  {
    status: err.status || 500,
    message: err.status === 404 ? err.message: 'Internal server error'
  }
  console.log(`${error.status} - ${error.message}`)
  res.status(error.status)
  res.render("error", {error})
});





app.listen(3000, () =>{
    console.log("Server is running on port 3000")
});
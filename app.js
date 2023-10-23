
const express = require('express');
const data = require('./data.json');
const path = require('path');

const app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

// route to homepage

app.get("/", (req, res) => {
    res.render("index" )
    res.locals = data.projects;
    console.log(res.locals);
});

//route to about page

app.get("/about", (req, res) => {
    res.render("about" ) 
});

//

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

app.use((error, req, res, next) => {
   
})





app.listen(3000, () =>{
    console.log("Server is running on port 3000")
});
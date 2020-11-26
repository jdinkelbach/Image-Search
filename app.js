const express = require("express");
const app = express();

// Set the view engine as ejs
app.set("view engine", "ejs");

// Routes
app.get("/", function(req, res){
    res.render("index");
});

// Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});
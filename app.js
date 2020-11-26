const express = require("express");
const app = express();

// Routes
app.get("/", function(req, res){
    res.send("it works!");
})

// Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
})
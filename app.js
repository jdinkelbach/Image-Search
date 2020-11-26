const express = require("express");
const app = express();
const fetch = require("node-fetch");

// Set the view engine as ejs
app.set("view engine", "ejs");

// Identify public folder as the folder for all static files
app.use(express.static("public"));

// Routes
app.get("/", async function(req, res){
    // Fetch random background from Unsplash
    let url = `https://api.unsplash.com/photos/random/?&client_id=7WEnZ0-HH3el9avQVajOeFDCW3rKQBj-LmaxAk6I6GY`;
    let response = await fetch(url);
    let data = await response.json();
    res.render("index", {"imageUrl": data.urls.small});
});

// Search Route
app.get("/search", async function(req, res){
    let keyword = "";
    if (req.query.keyword){
        keyword = req.query.keyword;
    }
    let url = `https://api.unsplash.com/photos/random/?count=9&client_id=7WEnZ0-HH3el9avQVajOeFDCW3rKQBj-LmaxAk6I6GY&featured=true&orientation=landscape&query=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    
    let imageUrlArray = [];
    for (let i = 0; i < data.length; i++){
        imageUrlArray.push(data[i].urls.small);
    }
    res.render("results", {"imageUrl": data[0].urls.small, "imageUrlArray": imageUrlArray});
})

// Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});

//https://api.unsplash.com/photos/?client_id=7WEnZ0-HH3el9avQVajOeFDCW3rKQBj-LmaxAk6I6GY
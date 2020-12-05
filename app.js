/* global pool */

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const pool = require("./dbPool.js")

// Set the view engine as ejs
app.set("view engine", "ejs");

// Identify public folder as the folder for all static files
app.use(express.static("public"));

// Routes
app.get("/", async function(req, res){
    // Fetch random background from Unsplash
    let url = `https://api.unsplash.com/photos/random/?&client_id=GBUwIJMyMSNx7a8vfuwO4JPnI_1mOmD3pXiKUNEksB0`;
    let response = await fetch(url);
    let data = await response.json();
    res.render("index", {"imageUrl": data.urls.small});
});

// Route for viewing favorite images
app.get("/getKeywords",  function(req, res) {
  let sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";
  let imageUrl = ["img/favorite.png"];
  pool.query(sql, function (err, rows, fields) {
     if (err) throw err;
     console.log(rows);
     res.render("favorites", {"imageUrl": imageUrl, "rows":rows});
  });  
});//getKeywords

// Search Route
app.get("/search", async function(req, res){
    let keyword = "";
    if (req.query.keyword){
        keyword = req.query.keyword;
    }
    let url = `https://api.unsplash.com/photos/random/?count=9&client_id=GBUwIJMyMSNx7a8vfuwO4JPnI_1mOmD3pXiKUNEksB0&featured=true&orientation=landscape&query=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    
    let imageUrlArray = [];
    for (let i = 0; i < data.length; i++){
        imageUrlArray.push(data[i].urls.small);
    }
    res.render("results", {"imageUrl": data[0].urls.small, "imageUrlArray": imageUrlArray});
})

// Route for updating favorites api
app.get("/api/updateFavorites", function(req, res){
  let sql;
  let sqlParams;
  
  // Add or delete
  switch (req.query.action) {
    case "add": sql = "INSERT INTO favorites (imageUrl, keyword) VALUES (?,?)";
                sqlParams = [req.query.imageUrl, req.query.keyword];
                break;
    case "delete": sql = "DELETE FROM favorites WHERE imageUrl = ?";
                sqlParams = [req.query.imageUrl];
                break;
  }//switch
  pool.query(sql, sqlParams, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.send(rows.affectedRows.toString());
  });
    
});//api/updateFavorites

// Start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});



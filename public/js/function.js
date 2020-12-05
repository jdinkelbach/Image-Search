/* global $ */
/* global fetch */
/* global URLSearchParams */

$(document).ready(function(){
    
    /*  When clicking on a favorite icon, the icon changes color
        and the image url is added/removed from the database. */
    $(".favoriteIcon").on("click", function(){
        let queryString = window.location.search;
        let urlParams   = new URLSearchParams(queryString);
        let keyword     = urlParams.get("keyword");
        let imageUrl = $(this).prev().prev().attr("src");
        let color = $(this).css("color");
        console.log(imageUrl);
        
        // Favorite
        if (color == "rgb(128, 128, 128)"){
            updateFavorite("add", imageUrl, keyword);
            console.log("favorite");
            $(this).css("color", "red");
        }
        // Unfavorite
        
        else{
            updateFavorite("delete", imageUrl, keyword);
            $(this).css("color", "rgb(128, 128, 128)");
        }
    })
    
    async function updateFavorite(action, imageUrl, keyword) {
        let url = `/api/updateFavorites?action=${action}&imageUrl=${imageUrl}&keyword=${keyword}`;
        await fetch(url);
    }
    
    // Fetches and displays favorite images with selected keyword
    $(".keywordLink").on("click", async function(){
        let keyword = $(this).html().trim();
        $("#keywordSelected").val(keyword);
        let response = await fetch(`/api/getFavorites?keyword=${keyword}`);
        let data = await response.json();
        
        // Display images
        $("#favorites").html("");
        let htmlString = "";
        data.forEach(function(row, i){
            htmlString += "<div class='img-frame'><img class='image' src='"+ row.imageURL +"' width='200' height='200'><br>";
            htmlString += "<i class='fas fa-heart favoriteIcon'></i></div>";
            if ((i + 1) % 4 == 0 ){
                htmlString += "<br><br>";
            }
        });
        $("#favorites").append(htmlString);
        $(".favoriteIcon").css("color", "red");
     });
     
     
    //Event for dynamic content generated when clicking on a keyword    
    $("#favorites").on("click", ".favoriteIcon", function(){
        let keyword = $("#keywordSelected").val();
        let imageUrl = $(this).prev().prev().attr("src");
        let color = $(this).css("color");
        console.log(keyword);
        
        // Favorite
        if (color == "rgb(128, 128, 128)"){
            updateFavorite("add", imageUrl, keyword);
            console.log("favorite");
            $(this).css("color", "red");
        }
        // Unfavorite
        else{
            updateFavorite("delete", imageUrl, keyword);
            console.log("unfavorite");
            $(this).css("color", "rgb(128, 128, 128)");
        }
    });
})
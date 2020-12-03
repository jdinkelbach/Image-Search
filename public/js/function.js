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
        let imageUrl = $(this).prev().attr("src");
        
        if ($(this).attr("color") == "#666"){   //Favorite
            $(this).toggleClass("red");
            updateFavorite("add", imageUrl, keyword);
        }
        else{
            $(this).toggleClass("red");         // Unfavorite
            updateFavorite("remove", imageUrl, keyword);
        }
    })
    
    async function updateFavorite(action, imageUrl, keyword) {
        let url = `/api/updateFavorites?action=${action}&imageUrl=${imageUrl}&keyword=${keyword}`;
        await fetch(url);
    }
})
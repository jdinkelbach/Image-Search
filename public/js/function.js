/* global $ */
$(document).ready(function(){
    $(".favoriteIcon").on("click", function(){
        if ($(this).attr("color") == "#666"){
            $(this).toggleClass("red");
        }
        else{
            $(this).toggleClass("red");
        }
    })
})
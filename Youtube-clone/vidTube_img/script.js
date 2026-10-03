var menuIcon = document.querySelector(".menu-icon");
var sideBar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

menuIcon.onclick = function(){
    sideBar.classList.toggle("small-sidebar") 
    // small sidebar is here a classs name now we will add the css for this classs

    container.classList.toggle("large-container")
}


const buttons = document.querySelectorAll(".button")
const body = document.querySelector("body")


buttons.forEach(function(button){
    console.log(button);
    button.addEventListener("click", function(e){
         console.log(e);
        console.log(e.target);
      //this target will shows the htmlspanelement when we click on the button it will showw from which button the target arise eg yellow grey etc etc

      if(e.target.id === "grey"){
        body.style.backgroundColor=e.target.id   //or you can directly write grey
      }
      if(e.target.id === "yellow"){
        body.style.backgroundColor=e.target.id   //or you can directly write yellow
      }
      if(e.target.id === "white"){
        body.style.backgroundColor=e.target.id   //or you can directly write white
      }
      if(e.target.id === "blue"){
        body.style.backgroundColor=e.target.id   //or you can directly write blue
      }
    })

})
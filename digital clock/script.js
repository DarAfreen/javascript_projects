const clock = document.getElementById('clock');
// const clock = document.querySelector('#clock') both are same here 

setInterval(function () {
  let date = new Date();
  // console.log(date.toLocaleTimeString()); this will print the time on the console window only not on the project page
  clock.innerHTML = date.toLocaleTimeString();   //this line is the game changer
}, 1000);
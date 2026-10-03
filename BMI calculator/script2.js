const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form refresh

  const height = parseFloat(document.querySelector('#height').value);
  const weight = parseFloat(document.querySelector('#weight').value);
  const results = document.querySelector('#results');

  // Selecting the BMI Guide paragraphs
  const underweightMsg = document.querySelector('.p1');
  const normalMsg = document.querySelector('.p2');
  const overweightMsg = document.querySelector('.p3');

  // Hide all BMI messages initially
  underweightMsg.style.display = "none";
  normalMsg.style.display = "none";
  overweightMsg.style.display = "none";

  if (isNaN(height) || height <= 0) {
    results.innerHTML = `Please enter a valid height.`;
    return;
  } 
  
  if (isNaN(weight) || weight <= 0) {
    results.innerHTML = `Please enter a valid weight.`;
    return;
  }

  // Calculate BMI
  const bmi = (weight / ((height * height) / 10000)).toFixed(2);

  // Determine BMI category and show relevant message
  if (bmi < 18.6) {
    underweightMsg.style.display = "block";
  } else if (bmi >= 18.6 && bmi <= 24.9) {
    normalMsg.style.display = "block";
  } else {
    overweightMsg.style.display = "block";
  }

  // Show the BMI result
  results.innerHTML = `<span>Your BMI is: ${bmi}</span>`;
});

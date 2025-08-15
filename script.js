// Floating cocoa powder particles
const cocoContainer = document.querySelector('.floating-coco');
const numParticles = 30;
for (let i = 0; i < numParticles; i++) {
  const particle = document.createElement('div');
  particle.classList.add('coco-particle');
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.top = Math.random() * 100 + 'vh';
  const size = Math.random() * 5 + 3;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.animationDuration = (5 + Math.random() * 10) + 's';
  particle.style.animationDelay = Math.random() * 10 + 's';
  cocoContainer.appendChild(particle);
}

// Toggle Ingredients
const toggleIngredientsBtn = document.getElementById('toggle-ingredients');
const ingredientsSection = document.querySelector('.ingredients');
toggleIngredientsBtn.addEventListener('click', () => {
  ingredientsSection.classList.toggle('collapsed');
  toggleIngredientsBtn.textContent = ingredientsSection.classList.contains('collapsed') ? 'Show Ingredients' : 'Hide Ingredients';
});

// Toggle Steps
const toggleStepsBtn = document.getElementById('toggle-steps');
const stepsSection = document.querySelector('.steps');
toggleStepsBtn.addEventListener('click', () => {
  stepsSection.classList.toggle('collapsed');
  toggleStepsBtn.textContent = stepsSection.classList.contains('collapsed') ? 'Show Steps' : 'Hide Steps';
});

// Cooking Steps
const startBtn = document.getElementById('start-cooking');
const nextBtn = document.getElementById('next-step');
const stepsList = document.querySelectorAll('.steps li');
const progressFill = document.querySelector('.progress-fill');
const currentStepLabel = document.getElementById('current-step-label');
const remainingLabel = document.getElementById('remaining-time-label');
const timerDisplay = document.getElementById('timer-display');

let currentStep = -1;
let timerInterval;
let remainingTime = 45 * 60; // 45 mins in seconds

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerDisplay.textContent = `⏰ ${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

function startTimer() {
  if(document.getElementById('enable-timer').checked){
    timerInterval = setInterval(() => {
      if(remainingTime>0){
        remainingTime--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
      }
    },1000);
  }
}

function highlightStep(index){
  stepsList.forEach((li,i)=> li.classList.toggle('active', i===index));
  currentStepLabel.textContent = `Step ${index+1} / ${stepsList.length}`;
  remainingLabel.textContent = `Remaining steps: ${stepsList.length - (index+1)}`;
  progressFill.style.width = `${100 - ((stepsList.length - (index+1))/stepsList.length)*100}%`;
}

startBtn.addEventListener('click', () => {
  currentStep = 0;
  highlightStep(currentStep);
  nextBtn.disabled = false;
  startTimer();
});

nextBtn.addEventListener('click', () => {
  if(currentStep < stepsList.length -1){
    currentStep++;
    highlightStep(currentStep);
  } else {
    nextBtn.disabled = true;
  }
});

// Print Recipe
document.getElementById('print').addEventListener('click', () => {
  window.print();
});

const countdownText = document.getElementById("countdown")
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

let state = false
let started = false
 
// Initialise some important variables
let currentCount = 300
let timer // Omit = to define the variable but with the value of "undefined"

function clear() { // code to clear the current running timer
  clearInterval(timer) // this will stop the interval
  timer = undefined // remove the reference to the old timer
}

function tick() { // code to be run each second while the timer is active
  count-- // decrement count
  if(count < 0) {
    started = false
    alert('Tiden är ute!') 
    return clear() // if count is less than, or equal to 0, stop the timer and return
  }
  countdownText.innerText = Math.floor(count/60) + ':' + Math.floor(count % 60)
}

function prepareTimer() {
  // On startButton click, if not timer running, start timer
  startButton.onclick = event => {
    if(!state){ //check if the button is in the start state
      state = true //set the start state to the pause state
      document.getElementById('startButton').innerText = '⏸️' //make the button say "pause" instead of "start"
      if(timer) return // if timer is running, return
      if(!started) {
        count = 300 // set count to its initial value
        started = true
        getQuestions() // prepare the questions
      } else {
        displayCurrentQuestion() // display the question again once the timer is resumed
      }
      countdownText.innerText = Math.floor(count/60) + ':' + Math.floor(count % 60)  // set the countdown text to counts current value
      timer = setInterval(tick, 1000) // run tick() every 1000ms

    } else if(state){ //check if the button is in the pause state
      state = false //set the pause state to the start state
      clear()
      clearQuestionDisplay() // hide the question while the game is paused
      document.getElementById('startButton').innerText = '▶️'
    }
  }
}
let textruta, enfraga, score
let points = 0

let currentQuestion = -1 // starta innan arrayen så nästa fråga blir den första
let questions
let currentAnswer = ""

// Hämta referenser till alla HTML objekt som behövs i skriptet.
function prepareGame() {
  textruta  = document.getElementById('textruta')
  enfraga = document.getElementById('enfraga')
  score  = document.getElementById("score")

  // Hitta elementet med id="form"
  // När "onsubmit" triggas, kör följande kod
  document.getElementById('form').onsubmit = event => {
    // om det inte finns något svar kan man inte svara
    if (currentAnswer == "") { return }
    // Hämta textrutans nuvarande värde
    // gör om värdet till enbart små bokstäver
    // dela värdet vid varje mellanslag till en array
    // sätt ihop arrayen till en sträng utan mellanslag.
    // Om värdet är "svaretlol", skrik "Rätt svar!!!"
    // annars, skrik "Lol du suger"
    if(textruta.value.toLowerCase().split(' ').join('') == currentAnswer) {
      /*alert("Rätt svar!!!")*/
      score.innerText=++points +' poäng'
    } else {
      /*alert("Lol du suger")*/
      if(points>0){
        score.innerText=--points +' poäng'
      }
    }

    // Töm textrutan
    textruta.value = ""

    // Sätt nästa fråga
    nextQuestion()
  } 
}

async function getQuestions() {
  questions = await fetch('./fragor.txt')
  questions = await questions.text()
  questions = questions.split('\n')
  questions = questions.map(JSON.parse)

  // Sätt första frågan
  nextQuestion()
}

function displayCurrentQuestion() {
  enfraga.innerText = questions[currentQuestion][0]
  currentAnswer = questions[currentQuestion][1].toLowerCase().split(' ').join('')
}

function clearQuestionDisplay() {
  enfraga.innerText = ""
  currentAnswer = ""
}

function nextQuestion() {
  if (currentQuestion >= questions.length - 1) {
    return
  } // Inga fler frågor
  currentQuestion++
  displayCurrentQuestion()
}

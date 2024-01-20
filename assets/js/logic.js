var time = document.querySelector("#time");
var startScreen = document.querySelector("#start-screen");
var start = document.querySelector("#start");
var questions = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var options = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var feedback = document.querySelector("#feedback");
var finalScore = document.querySelector("#final-score");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");

var choiceList = document.createElement('ol');

// Variable to store the cummulative scores.
var mark = 0;
// 1 mark = 10 scores.
var score  = 10;
// Variable to keep count number of times
// quiz has been taken
var initIndex = 0;

// Total time for quiz test
var timerCount = 75;
// Tracker for the setInterval function
var timer = undefined;
// Penalty given for failed question (wrong answer).
var penalty = -10;
// Tracker for each question number.
var questionNumber = 0;

var correct = new Audio('https://emeka-egbuna.github.io/Quiz-Challenge/assets/sfx/correct.wav');
// Default volume
var volume = 1;
//audio.paused = false;
correct.volume = volume;
var promise = undefined;

var incorrect = new Audio('https://emeka-egbuna.github.io/Quiz-Challenge/assets/sfx/incorrect.wav');

/*
 * E V E N T    L I S T E N E R
 * 
 * Displays each question and hides previous ones.
 */
start.addEventListener("click", function(event){
    startTimer();

    startScreen.classList.add("hide");
    questions.classList.remove("hide");
    getQuestion();
});

/*
 * F U N C T I O N
 *
 * startTimer()
 * 
 * The setTimer function starts and
 * stops the timer
 */
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    time.innerHTML = timerCount;
    if (timerCount >= 0) {
      // Tests if time ellapsed condition is met
      if (timerCount <= 0) {
        // Clears interval and stops timer
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

/*
 * F U N C T I O N
 *
 * getQuestion()
 * Selects the next question by calling displayQuestions(index)
 * and set CSS properties to display the next question and
 * hides previous question.
 * 
 * Function also stores index increment for the next question in
 * the localStorage browser property.
 */
function getQuestion(){
  questionTitle.textContent = testQuestions[questionNumber]['question'];
  displayQuestions(questionNumber);
  
  localStorage.setItem("questionNumber", questionNumber);
}

/*
 * F U N C T I O N
 *
 * displayQuestions(index)
 * Displays each question from the testQuestions
 * data structure and also creates li elements for answer choices to
 * attach to the ol element.
 * 
 * @param index - a counter to keep track of next
 * question in the queue to display.
 */
function displayQuestions(index) {
  // Clear choiceList element
  choiceList.innerHTML = "";

  // Render a new li for each answer per question
  for (var i = 0; i < choices[index]['choice'].length; i++) {
      var chosen = choices[index]['choice'][i];
  
      var li = document.createElement("li");
  
      var attribute = document.createAttribute("data-index");
      attribute.value = i;
      li.setAttributeNode(attribute);

      choiceList.appendChild(li);
  
      var complete = document.createElement("BUTTON");
      var buttonAttr = document.createAttribute("data-index");
      complete["data-index"] = i;

      complete.textContent = (i+1) + ". " + chosen;
  
      complete.addEventListener("click", function(event) {
        event.preventDefault();
  
        var answerIndex = event.target["data-index"];
        feedback.classList.remove("hide");

        // Test if string value of question answer-button equals
        // equivalent index in Answer array 
        if(event.target.innerHTML.slice(3) === answers[localStorage.getItem("questionNumber")]) {
          showRemark("Correct!");
          mark += score;
          correct.play();
        } else {
          showRemark("Wrong!");
          incorrect.play();
          timePenalty();
        }

        if(questionNumber < testQuestions.length) {
          questionNumber++;

          // Increment and store question number index to load next question
          localStorage.setItem("questionNumber", questionNumber);

          if(questionNumber == testQuestions.length) {
            endQuiz();
          }

          getQuestion();
        } else {
          endQuiz();
        }
      });

    li.appendChild(complete);
  }
  options.appendChild(choiceList);
}

/*
 * F U N C T I O N
 *
 * showRemark(remark)
 * Alerts the user if the selected answer choice
 * is Correct or Wrong.
 * 
 * @param remark - for adding correct or wrong user option
 * for each question.
 */
function showRemark(remark) {
    feedback.textContent = remark;

    // Sets timer
    remarkTimer = setTimeout(function() {
      feedback.classList.add("hide");
      clearTimeout(remarkTimer);
    }, 1000);
  }

/*
 * E V E N T    L I S T E N E R
 * 
 * Displays form for user to enter their initials and stores
 * it with the user test score.
 */
  submit.addEventListener("click", function(event){
  event.preventDefault();

  var item = Number(localStorage.getItem("initIndex"));

  if(item === 0){
    initIndex++;
  } else {
    initIndex = ++item;
  }

  localStorage.setItem("initIndex", initIndex);
  localStorage.setItem("initials"+initIndex, initials.value.toUpperCase()
          + ": " + mark);

  if(initials.value.length != 0){
    // Redirect to the high scores HTML page:
    window.location.href = "highscores.html";
  } else {
    // Doo nothing
  }
});

function timePenalty() {
  timerCount += penalty;

  if(timerCount <= 0) {
    timerCount = 0;
    clearInterval(timer);
  }

  time.innerHTML = timerCount;
}

function endQuiz() {
  finalScore.textContent = mark;
  questions.classList.add("hide");
  endScreen.classList.remove("hide");
  feedback.classList.add("hide");
}
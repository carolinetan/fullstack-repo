/**
 * Created by ctan on 5/16/2018.
 */
'use strict';

let questionNumber = 0;
let score = 0;



function initializeQuiz() {
    console.log("invoked: initializeQuiz()");

    $( '.col-12' ).on( 'click', '.play-button', function (event) {
        console.log( 'row with let\'s play button is being removed' );
        $('.col-12').remove();
        $('.quiz-main').css( 'display', 'inline' );
        updateScoreBoard();
    } );
}

function resetScoreBoard() {
    questionNumber = 0;
    score = 0;
    updateScoreBoard();
}

function updateScoreBoard() {
    console.log("invoked: updateScoreBoard()");
    if (questionNumber < QUIZ_DB.length) {
        $( '.questionNumber' ).text( questionNumber + 1 );
        $( '.score' ).text( score );
    }
}

function incrementQNCount() {
    console.log("invoked: incrementQNCount()");
    if (questionNumber < QUIZ_DB.length) {
        questionNumber++;
    }
    console.log(`incrementQNCount: questionNumber = ${questionNumber}`);
}

function incrementScore() {
    console.log("invoked: incrementScore()");
    score++;
    console.log(`incrementScore: score = ${score}`);
}


function displayUserQuestion() {
    console.log("invoked: displayUserQuestion()");
    $( '.quiz-main' ).html( generateQuizItem() );
}


function generateQuizItem() {
    console.log(`generateQuizItem: questionNumber = ${questionNumber}`);

    if (questionNumber < QUIZ_DB.length) {
        return`
    <div class="row quiz-question">
        <h2>${QUIZ_DB[questionNumber].question}</h2>
    </div>
    <div class="row">
    <div class="col-6 quiz-form">
        <img class="quiz-image"
            src="${QUIZ_DB[questionNumber].image}" alt="${QUIZ_DB[questionNumber].imageLabel}"/>
    </div>
    <div class="col-6 quiz-form">
    <form>
        <fieldset role="radiogroup" aria-required="true">
            <label class="answerOption">
                <input tabindex="11" type="radio" value="${QUIZ_DB[questionNumber].answers[0]}" name="answer" required="required">
                <span>${QUIZ_DB[questionNumber].answers[0]}<br></span>
            </label>
            <label class="answerOption">
                <input tabindex="12" type="radio" value="${QUIZ_DB[questionNumber].answers[1]}" name="answer" required="required">
                <span>${QUIZ_DB[questionNumber].answers[1]}<br></span>
            </label>
            <label class="answerOption">
                <input tabindex="13" type="radio" value="${QUIZ_DB[questionNumber].answers[2]}" name="answer" required="required">
                <span>${QUIZ_DB[questionNumber].answers[2]}<br></span>
            </label>
            <label class="answerOption">
                <input tabindex="14" type="radio" value="${QUIZ_DB[questionNumber].answers[3]}" name="answer" required="required">
                <span>${QUIZ_DB[questionNumber].answers[3]}<br></span>
            </label>
            <button type="submit" class="submit-button">Submit</button>
        </fieldset>
        </form>
    </div>
    </div>`;
    }
}

function handleUserSelection() {
    console.log("invoked: handleUserSelection()");

    $('form').on( 'submit', function (event) {

        console.log(`handleUserSelection: questionNumber = ${questionNumber}`);

        event.preventDefault();
        let selected = $( 'input:checked' );
        let answer = selected.val();
        let correctAnswer = `${QUIZ_DB[questionNumber].correctAnswer}`;
        console.log(`handleUserSelection: user-answer=${answer}, correct-answer=${correctAnswer}`);

        if (answer === correctAnswer) {
            incrementScore();
            updateScoreBoard();
            provideUserFeedback(true);
        }
        else {
            provideUserFeedback(false);
        }
        incrementQNCount();
    });

    console.log(`CHECK: questionNumber=${questionNumber}, QUIZ_DB.length=${QUIZ_DB.length}`);
    if (questionNumber == QUIZ_DB.length) {
        generateEndUserFeedback();
        retryQuizApp();
    }

}


function provideUserFeedback(answer) {
    if (answer) {
        $('.quiz-main').html(`
        <div class="row feedback">
            <img src="images/correct.png" alt="correct answer!"/>
            <p><b>You got it right!</b></p>
            <span>${QUIZ_DB[questionNumber].feedback}<br></span>
        </div>
        <div class="row feedback">
            <button tabindex="0" type=button class="nextButton">Next</button>
        </div>`);
    }
    else {
        $('.quiz-main').html(`
        <div class="row feedback">
            <img src="images/wrong.png" alt="wrong answer!"/>
            <p><b>You got it wrong!</b></p>
            <span>${QUIZ_DB[questionNumber].feedback}<br></span>
        </div>
        <div class="row feedback">
            <button tabindex="0" type=button class="nextButton">Next</button>
        </div>`);
    }
}

function handleNextButton() {
    console.log("invoked: handleNextButton()");

    $('.quiz-main').on('click', '.nextButton', function (event) {
        displayUserQuestion();
        handleUserSelection();
        updateScoreBoard();
    });
}


function generateEndUserFeedback() {
    let totalScore = "SCORE: " + `${score}` + " / 10";
    let imageToUse = "images/good.png";
    let scoreMsg = 'Excellent!';

    if (score <= 5) {
        imageToUse = "images/do-better.png";
        scoreMsg = 'Ouch! Try again?';
    }
    else
    if (score > 5 && score < 8) {
        imageToUse = "images/neutral.png";
        scoreMsg = 'You can do better!';
    }

    $('.quiz-main').html(`
        <div class="row results">
            <img src="${imageToUse}"/>
            <p><b>${totalScore}</b></p>
            <span>${scoreMsg}<br></span>
        </div>
        <div class="row feedback">
            <button tabindex="0" type=button class="restartButton">Restart Quiz</button>
        </div>`);
}

function retryQuizApp() {
    console.log("invoked: retryQuizApp()");
    $('main').on('click', '.restartButton', function (event) {
        location.reload();
    });
}



function playQuizApp() {
    console.log("invoked: playQuizApp()");
    initializeQuiz();
    displayUserQuestion();
    handleUserSelection();
    handleNextButton();
}

$( playQuizApp );

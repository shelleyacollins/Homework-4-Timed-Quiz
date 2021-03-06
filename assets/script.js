$(document).ready(function() {
    var questionDiv = $("#question");
    var correctIndicatorEl = $("#correct-indicator");

    var currentQuestionIndex = 0;
    var timeRemaining = 90;
    var timeInterval;

    function displayQuestion() {
        // Show the first question.
        questionDiv.empty();

        var h1El = $("<h1>");
        h1El.text(questions[currentQuestionIndex].title);
        questionDiv.append(h1El);
        var ulEl = $("<ul>");

        for (var i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
            var liEl = $("<li>");
            var buttonEl = $("<button>");
            buttonEl.addClass("btn btn-secondary answer");
            buttonEl.text(questions[currentQuestionIndex].choices[i]);
            buttonEl.attr("data-choice", questions[currentQuestionIndex].choices[i]);
            liEl.append(buttonEl);
            ulEl.append(liEl);
        }

        questionDiv.append(ulEl);
    }

    function setAndClearIndicator(text) {
        correctIndicatorEl.text(text);
        setTimeout(function() {
            correctIndicatorEl.text("");
        }, 1000);
    }

    $("#start-quiz").on("click", function() {
        $("#welcome-screen").attr("style", "display: none");
        timeInterval = setInterval(function() {
            $("#time-remaining").text(timeRemaining);
            timeRemaining--;
        }, 1000);
        displayQuestion();
    });

    $("#question").on("click", ".answer", function() {
        if (
            $(this).attr("data-choice") === questions[currentQuestionIndex].answer
        ) {
            setAndClearIndicator("Correct!");
        } else {
            setAndClearIndicator("Incorrect!");
            timeRemaining = timeRemaining - 10;
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            clearInterval(timeInterval);
            questionDiv.attr("style", "display: none");
            $("#save-screen").attr("style", "display: block");
        }
    });

    $("#save-game").on("click", function() {



        var userInitials = $("#user-initials").val();


        var highScores = JSON.parse(localStorage.getItem("highscores"));

        if (!highScores) {
            highScores = [];
        }
        var currentHighScore = {
            user: userInitials,
            score: timeRemaining,
        };
        highScores.push(currentHighScore);
        localStorage.setItem("highscores", JSON.stringify(highScores));
        highScores = JSON.parse(localStorage.getItem("highscores"));

        var sortedHighscores = highScores.sort(function(a, b) {
            return b.score - a.score
        })
        console.log(sortedHighscores, sortedHighscores[0])

        $("#high-score").text("High Score:" + JSON.stringify(sortedHighscores[0].score))
        $("#save-score").attr("style", "display:none")
        $("#show-score").attr("style", "display:block")
    });


    $(".goback").on("click", function() {
        location.reload()
    })
    $(".clear").on("click", function() {
        localStorage.clear()
    })
});
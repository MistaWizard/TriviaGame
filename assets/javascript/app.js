$(document).ready(function() {
    var options = [
        {
            question: "Which Pokemon is not a generation 1 starter?", 
            choice: ["Squirtle", "Piplup", "Charmander", "Pikachu"],
            answer: 1,
            photo: "assets/images/250px-393Piplup.png"
        },
        {
            question: "Which Pokemon is a generation 2 legendary?",
            choice: ["Mewtwo", "Rayquaza", "Regigigas", "Lugia"],
            answer: 3,
            photo: "assets/images/600px-249Lugia.png"
        },
        {
            question: "Does the anime character Ash appear in the main series games as the protagonist?",
            choice: ["Yes", "No"],
            answer: 1,
            photo: "assets/images/Ash_SM.png"
        },
        {
            question: "Which Pokemon was created and designed first?",
            choice: ["Pikachu", "Arceus", "Rhydon", "Mew"],
            answer: 2,
            photo: "assets/images/112Rhydon.png"
        },
        {
            question: "Which Pokemon game had connectivity with cell phones in Japan?",
            choice: ["FireRed", "Diamond", "Moon", "Crystal"],
            answer: 3,
            photo: "assets/images/Crystal_EN_boxart.png"
        }
    ];

    var pokeWins = 0;
    var pokeLosses = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var pokeGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    // Hide the reset button on first load
    $("#reset").hide();


    // Click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            $("#pokeWins").text(pokeWins);
            $("#pokeLosses").text(pokeLosses);
            correctCount = 0;
            wrongCount = 0;
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
    })

    // Timer start function
    function runTimer(){
	    if (!running) {
	    intervalId = setInterval(decrement, 1000); 
	    running = true;
	    }
    }
    // Timer countdown function
    function decrement() {
	    $("#pokeTime").text(timer);
	    timer --;

	// Stop timer if the count reaches 0
	    if (timer === 0) {
	    	unanswerCount++;
		    stop();
            $("#answerblock").html("<p>Time is up!</p>");
            hidepicture();
	    }	
    }

    // Timer stop function
    function stop() {
    	running = false;
	    clearInterval(intervalId);
    }

    // Randomly pick our question to ask the user
    function displayQuestion() {
	    index = Math.floor(Math.random()*options.length);
	    pick = options[index];

	    // Iterate through answer array and display
	    $("#questionSection").html("<h2>" + pick.question + "</h2>");
	    for (var i = 0; i < pick.choice.length; i++) {
	    	var userChoice = $("<div>");
	    	userChoice.addClass("answerchoice");
		    userChoice.html(pick.choice[i]);
		    // Assign array position to it so can check for the correct answer
		    userChoice.attr("data-guessvalue", i);
		    $("#answerblock").append(userChoice);
        }

        // Click function to select answer and determine if that answer is correct
        $(".answerchoice").on("click", function () {
	        // Grab array position from pokeGuess
	        pokeGuess = parseInt($(this).attr("data-guessvalue"));

	        // Determine if the answer is wrong or right
	        if (pokeGuess === pick.answer) {
		        stop();
		        pokeWins++;
                pokeGuess="";
                $("#answerblock").html("<p>Correct!</p>");
                $("#pokeWins").text(pokeWins);
		        hidepicture();
            }
            else {
		        stop();
		        pokeLosses++;
                pokeGuess="";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                $("#pokeLosses").text(pokeLosses);
		        hidepicture();
	        }
        })
    }

    // Hide the picture associated with the correct answer
    function hidepicture () {
	    $("#answerblock").append("<img src=" + pick.photo + ">");
	    newArray.push(pick);
    	options.splice(index,1);

        // Hide picture timeout
    	var hidpic = setTimeout(function() {
	    	$("#answerblock").empty();
	    	timer= 10;

	        // Run the end of game if all the questions are answered
	        if ((pokeLosses + pokeWins + unanswerCount) === qCount) {
	    	    $("#questionSection").empty();
		        $("#reset").show();
	        	pokeWins = 0;
	    	    pokeLosses = 0;
	        	unanswerCount = 0;
            }
            else {
		        runTimer();
		        displayQuestion();
    	    }
	    }, 3000);
    }

    // Click the reset button to restart the game
    $("#reset").on("click", function() {
        $("#reset").hide();
	    $("#answerblock").empty();
        $("#questionSection").empty();
        $("#pokeWins").text(pokeWins);
	    $("#pokeLosses").text(pokeLosses);
        correctCount = 0;
        wrongCount = 0;
	    for(var i = 0; i < holder.length; i++) {
	    	options.push(holder[i]);
	    }
	    displayQuestion();
	    runTimer();
    })

})
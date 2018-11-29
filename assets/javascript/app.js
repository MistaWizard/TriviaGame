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


    $("#reset").hide();
    //click start button to start game
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

    //timer start
    function runTimer(){
	    if (!running) {
	    intervalId = setInterval(decrement, 1000); 
	    running = true;
	    }
    }
    //timer countdown
    function decrement() {
	    $("#pokeTime").text(timer);
	    timer --;

	//stop timer if reach 0
	    if (timer === 0) {
	    	unanswerCount++;
		    stop();
            $("#answerblock").html("<p>Time is up!</p>");
            hidepicture();
	    }	
    }

    //timer stop
    function stop() {
    	running = false;
	    clearInterval(intervalId);
    }

    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
	    //generate random index in array
	    index = Math.floor(Math.random()*options.length);
	    pick = options[index];

	    //iterate through answer array and display
	    $("#questionSection").html("<h2>" + pick.question + "</h2>");
	    for (var i = 0; i < pick.choice.length; i++) {
	    	var userChoice = $("<div>");
	    	userChoice.addClass("answerchoice");
		    userChoice.html(pick.choice[i]);
		    //assign array position to it so can check answer
		    userChoice.attr("data-guessvalue", i);
		    $("#answerblock").append(userChoice);
        }

        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
	        //grab array position from pokeGuess
	        pokeGuess = parseInt($(this).attr("data-guessvalue"));

	        //correct guess or wrong guess outcomes
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


    function hidepicture () {
	    $("#answerblock").append("<img src=" + pick.photo + ">");
	    newArray.push(pick);
    	options.splice(index,1);

    	var hidpic = setTimeout(function() {
	    	$("#answerblock").empty();
	    	timer= 10;

	        //run the score screen if all questions answered
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
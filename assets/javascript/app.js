$(document).ready(function() {


    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    // var qCount = options.length;
    // var pick;
    // var index;
    // var newArray = [];
    // var holder = [];

    //timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#pokeTime").html(timer);
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#questionSection").html("<p>Time is up!</p>");
	}	
}

runTimer();
})
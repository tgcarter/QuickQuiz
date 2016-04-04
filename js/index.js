function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);    
}
function onDeviceReady(){
    navigator.splashscreen.hide();
}
var timeleft = true;
var qnum = null;
var answercorrect = 0;
var questions = [
    	{"question":"Is New York the capital of America?", "Answer":"0"},
    	{"question":"The Great Wall Of China is visible from the moon?", "Answer":"0"},
    	{"question":"The ‘black box’ in an aeroplane is black?", "Answer":"0"},
    	{"question":"The record for the longest rail tunnel is held by the Channel Tunnel between Britain and France?", "Answer":"0"},
	];
$(document).on("pageshow","#game",function(){
	shake.startWatch(onShake, 100);
	var count=60;
	answercorrect = 0;
	document.getElementById("time").innerHTML=count;
	var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
	function timer() {
	  	count--;
	  	if (count <= 0){
	    	clearInterval(counter);
	    	document.getElementById("time").innerHTML="0";
	    	$("#quiz").html("<h1 class='center-wrapper'>Times Up!</h1><h2 class='center-wrapper'>Your score was "+answercorrect+"!</h2>");
	    	timeleft = false;
	    	return;
	  	} else {
	  		document.getElementById("time").innerHTML=count; // watch for spelling
	  	}
	}
	QuestionDisplay();
	$("#true").on("tap",function(){
		if (questions[qnum].answer=="1"){
			answercorrect++;
			console.log(answercorrect);
		}
		QuestionDisplay();
	});
	$(document).on("pagebeforehide","#game",function(){
		clearInterval(counter);
		shake.stopWatch();
	});

});
function QuestionDisplay(){
	if (timeleft===true){
	 	qnum = Math.floor(Math.random() * Object.keys(questions).length) + 0;
	 	var showquestion = questions[qnum].question;
	 	document.getElementById("question").innerHTML=showquestion;
	 	console.log(questions[qnum].answer);
	}
}
var onShake = function () {
	if (questions[qnum].answer=="0"){
		answercorrect++;
		console.log(answercorrect);
	}
	QuestionDisplay();
};

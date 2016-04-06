var isOffline;
var timeleft = true;
var qnum = null;
var answercorrect = 0;
var count;
var useshake = true;
var highscore = 0;
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    highscore = localStorage.getItem('highscore') || 0;
    document.getElementById("highscore").innerHTML=highscore;
    isOffline = 'onLine' in navigator && !navigator.onLine; 
    if ( isOffline ) {
    	questions=localquestions;
	}
	else {
		$.getScript("http://www.tomgc.com/app.json")
			.fail(function(){
				questions=localquestions;
			})
			.success(function(){
				questions=remotequestions;
		});
	}
}
function onDeviceReady(){
    navigator.splashscreen.hide();
}
$(document).on("pagebeforeshow","#home",function(){
	document.getElementById("highscore").innerHTML=highscore;
});
$(document).on("pagebeforeshow","#game",function(){
	$("#timeup").hide();
	$("#quiz").show();
	count=10;
	timeleft = true;
	answercorrect = 0;
	document.getElementById("time").innerHTML=count;
	if (useshake===true){
		$("#falsebtn").hide();
	}
	QuestionDisplay();
});
$(document).on("pageshow","#game",function(){
	if (useshake===true){
		shake.startWatch(onShake, 10);
	}
	var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
	var finish;
	function timer() {
	  	count--;
	  	if (count <= 0){
	    	clearInterval(counter);
	    	document.getElementById("time").innerHTML="0";
	    	$("#quiz").hide();
	    	document.getElementById("score").innerHTML=answercorrect;
	    	$("#timeup").show();
	    	timeleft = false;
	    	if (answercorrect > highscore){
	    		highscore = answercorrect;
	    		localStorage.setItem('highscore', highscore);
	    	}
	    	finish = setTimeout(function () {
    			$(':mobile-pagecontainer').pagecontainer('change', '#home');
			}, 3000);
	    	return;
	  	} else {
	  		document.getElementById("time").innerHTML=count; // watch for spelling
	  	}
	}
	$("#true").on("tap",function(){
		if (questions[qnum].answer=="1"){
			answercorrect++;
		}
		QuestionDisplay();
	});
	$("#falsebtn").on("tap",function(){
		if (questions[qnum].answer=="0"){
			answercorrect++;
		}
		QuestionDisplay();
	});
	$(document).on("pagebeforehide","#game",function(){
		clearInterval(counter);
		clearTimeout(finish);
		if(useshake===true){
			shake.stopWatch();
		}
	});
});
function QuestionDisplay(){
	if (timeleft===true){
	 	qnum = Math.floor(Math.random() * questions.length) + 0;
	 	var showquestion = questions[qnum].question;
	 	document.getElementById("question").innerHTML=showquestion;
	}
}
var onShake = function () {
	if (questions[qnum].answer=="0"){
		answercorrect++;
	}
	QuestionDisplay();
};
$(document).on("pageshow","#settings",function(){
	$("#highscorereset").on("tap",function(){
		highscore=0;
	});
});
$(document).on('change', '#checkbox', function(){
		useshake = !useshake;
});

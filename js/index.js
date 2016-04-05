var isOffline;
var timeleft = true;
var qnum = null;
var answercorrect = 0;
var count;
var useshake = true;
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    /*isOffline = 'onLine' in navigator && !navigator.onLine; 
    if ( isOffline ) {
	}
	else {
	}*/
}
function onDeviceReady(){
    navigator.splashscreen.hide();
    $('#checkbox').change(function(){
		useshake = !useshake;
		console.log(useshake);
	});
}
$(document).on("pagebeforeshow","#game",function(){
	$("#timeup").hide();
	$("#quiz").show();
	count=5;
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
		shake.startWatch(onShake, 0);
	}
	var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
	function timer() {
	  	count--;
	  	if (count <= 0){
	    	clearInterval(counter);
	    	document.getElementById("time").innerHTML="0";
	    	$("#quiz").hide();
	    	document.getElementById("score").innerHTML=answercorrect;
	    	$("#timeup").show();
	    	timeleft = false;
	    	setTimeout(function () {
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
	$(document).on("pagebeforehide","#game",function(){
		clearInterval(counter);
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
	console.log("shake");
	if (questions[qnum].answer=="0"){
		answercorrect++;
	}
	QuestionDisplay();
};
$(document).on("pageshow","#settings",function(){

});
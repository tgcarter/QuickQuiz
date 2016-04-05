var isOffline;
var timeleft = true;
var qnum = null;
var answercorrect = 0;
var count;
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
}
$(document).on("pagebeforeshow","#game",function(){
	$("#timeup").hide();
	$("#quiz").show();
	count=20;
	timeleft = true;
	answercorrect = 0;
	document.getElementById("time").innerHTML=count;
});
$(document).on("pageshow","#game",function(){
	if($('#chkbox').is(':checked')){
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
	    	return;
	  	} else {
	  		document.getElementById("time").innerHTML=count; // watch for spelling
	  	}
	}
	QuestionDisplay();
	$("#true").on("tap",function(){
		if (questions[qnum].answer=="1"){
			answercorrect++;
		}
		QuestionDisplay();
	});
	$(document).on("pagebeforehide","#game",function(){
		clearInterval(counter);
		if($('#chkbox').is(':checked')){
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
	$("#toggleshake").on("tap",function(){
		useshake = !useshake;
		console.log(useshake);
	});
});
$("select").change(function() {
    $("select option:selected").each(function() {
      str += $(this).text() + " ";
    });
    $( "div" ).text( str );
}).trigger( "change" );
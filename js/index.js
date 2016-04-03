function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
    navigator.splashscreen.hide();
    var db = window.openDatabase("quickquiz", 1.0, "Questions DB", 1024 * 1024);
}
var timeleft = true;
var questions = 0;
$(document).on("pageshow","#game",function(){
	var count=5;
	document.getElementById("time").innerHTML=count;
	var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
	function timer() {
	  	count=count-1;
	  	if (count <= 0){
	    	clearInterval(counter);
	    	document.getElementById("time").innerHTML="0";
	    	$("#quiz").html("<h1 class='center-wrapper'>Times Up!</h1>");
	    	timeleft = false;
	    	return;
	  	} else {
	  		document.getElementById("time").innerHTML=count; // watch for spelling
	  	}
	 	
	}
	$(document).on("pagebeforehide","#game",function(){
		clearInterval(counter);
	});
});
function createTable(tx) {	
 	tx.executeSql("CREATE TABLE IF NOT EXISTS questions(_id INTEGER PRIMARY KEY, question VARCHAR, answer INT)", addsuccess, adderror);
}//Add Questions
function addsuccess(tx) {
	tx.executeSql("INSERT INTO questions(question, answer) VALUES ('Is New York the capital of America?', 0)");
	tx.executeSql("INSERT INTO questions(question, answer) VALUES ('The Great Wall Of China is visible from the moon?', 0)");
	tx.executeSql("INSERT INTO questions(question, answer) VALUES ('The ‘black box’ in an aeroplane is black?', 0)");
	tx.executeSql("INSERT INTO questions(question, answer) VALUES ('The record for the longest rail tunnel is held by the Channel Tunnel between Britain and France?', 0)");
	console.log("Input");
	Questions();

}
function error(err) {
	alert("An Error has occured:" + err.message);
}
//Get Questions
function Questions (){
	function getQuestions(tx){
		tx.executeSql('SELECT * FROM questions', [], getsuccess, error);
	}
	function getsuccess(tx) {
		db.transaction(addQuestions, error);
		questions = results.rows.length;
		console.log("Output");
	}
}
/*//Database Creation
var db = window.openDatabase("quickquiz", 1.0, "Questions DB", 1024 * 1024);
db.transaction(createTable, error, success);
	
function createTable(tx) {	
 	tx.executeSql("CREATE TABLE IF NOT EXISTS questions(id UNIQUE, question TEXT, answer INT)");
}
	
function success() {
	db.transaction(addFood, error);
}
	
function addFood(tx) {
	tx.executeSql("INSERT INTO food(id, title) VALUES (1, 'chips')");
	tx.executeSql("INSERT INTO food(id, title) VALUES (2, 'cake')");
	tx.executeSql("INSERT INTO food(id, title) VALUES (3, 'nachos')");
}
	
function error(err) {
	alert("An Error has occured:" + err.message);
}*/


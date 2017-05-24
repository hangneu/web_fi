var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname+"/public"));
var PythonShell = require('python-shell');
var question_answer = [
	{index:0, question:"question 1", answer:"answer 1"}
];
var p = "infor from node server side";
app.get("/query/j", listAllQA);
function listAllQA(req, res){
	res.send(question_answer);
}
app.delete("/query/j/:index", deleteItem);
function deleteItem(req, res){
	var index = req.params.index;
	var count;
	for(count = 0; count < question_answer.length; count++){
		if(question_answer[count].index == index){
			break;
		}
	}
	console.log(count);
	question_answer.splice(count,1);
	res.send(question_answer);
}
app.post("/query/j", query);
function query(req, res){

	var query1 = req.body;
	var infor = query1.title;
	var len = question_answer.length;
	var new_index;
	console.log(len);
	if (len != 0){
		var last = question_answer[len - 1];
		new_index = last.index + 1;
	} else {
		new_index = len;
	}
	var newItem = {index: new_index, question: infor};

	//console.log(infor);
	var pyshell = new PythonShell('first_python.py');
	pyshell.send(JSON.stringify([infor]));
	pyshell.on('message', function(message){
		//console.log(message);
		newItem['answer'] = message;
		console.log(newItem);
		question_answer.push(newItem);
		res.send(question_answer);
	})
	pyshell.end(function (err) {
		if (err){
        	throw err;
    	};
    	console.log('finished');
	});
}
app.listen(3000);








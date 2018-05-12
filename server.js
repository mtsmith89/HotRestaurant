var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express(); 
var PORT = process.env.PORT || 80; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


var tableData = [
	{
		name: "Bob",
		email: "bob@gmail.com",
		number: "919-111-4567",

	}
];


var waitListData = [
	{
		name: "Someone",
		email: "Someone@gmail.com",
		phone: "919-123-4567"
	}
];


app.get('/tables', function(req, res){
    res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/reserve', function(req, res){
    res.sendFile(path.join(__dirname, 'reserve.html'));
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/tables', function(req, res){
   return res.json(tableData);
});

app.get('/api/waitlist', function(req, res){
   return res.json(waitListData);
});

app.post('/api/tables', function(req, res){
    if(tableData.length < 5 ){
        tableData.push(req.body);
        res.json(true); 
    }
    
    else{
        waitListData.push(req.body);
        res.json(false); 
    }

});

app.post('/api/clear', function(req, res){
    tableData = [];
    waitListData = [];
    console.log(tableData);
})


app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
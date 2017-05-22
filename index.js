var app = require('express')();
var server = require('http').Server(app);
var io= require('socket.io')(server);
var path = require('path');
var cpuStat = require('cpu-stat');
var memStat = require('mem-stat');
var si = require('systeminformation');

var _dirname = path.resolve();

server.listen(3333);

app.get("/", function(req, res) {
	res.sendFile(_dirname+ '/index.html');
});

io.on('connection', function(socket) {
	socket.emit('news','hello world');
	socket.on('my other event', function(data) {

	cpuStat.usagePercent({
	    sampleMs: 10000,
	  },
	  function(err, percent, seconds) {
	    if (err) {
	      return console.log(err);
	    }
	    var usedPercent = Math.round(memStat.usedPercent());
		var message = '{"CPU" : '+ Math.round(percent) + ', "RAM": ' + usedPercent+'}'; 
		console.log(message);
	    socket.emit('news',  JSON.parse(message));

	    console.log(usedPercent);
	    //the percentage cpu usage for core 0
	    console.log(Math.round(percent));
	});

	//console.log(data);
	});
}); 

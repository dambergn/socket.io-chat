var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Socet.IO connections
let connections = {};

io.on('connection', function(socket){
  console.log('a user connected', socket.id);

  // socket.on('register', handleRegister)

  // socket.on('join', handleJoin)

  // socket.on('leave', handleLeave)

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  // socket.on('chatrooms', handleGetChatrooms)

  // socket.on('availableUsers', handleGetAvailableUsers)

  socket.on('disconnect', function(){
    console.log(`user ${socket.id} disconnected`);
  });
  
  socket.on('error', function (err) {
    console.log('received error from client:', socket.id)
    console.log(err)
  })
});

http.listen(3002, function(){
  console.log('listening on *:3002');
});
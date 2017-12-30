const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");

const http = require("http");
const socketIo = require("socket.io");

const api = require("./server/routes/api");
const port = 3002;

const app = express();

const Poll = require('./server/models/poll');

app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use('/api', api);
app.use('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

const server = http.Server(app);

const io = socketIo(server);
io.on('connection',(socket) =>{
    console.log('New User Connected');
    socket.emit('test', {
        testmsg : 'testmessg22'
    });
    socket.on('savePoll',(data)=>{
        console.log('At server socket on');
        console.log(data);
        var ip = socket.request.connection.remoteAddress;
       // ip = '192.168.1.1';
        console.log('ip address : ' + ip);
                Poll.findOneAndUpdate({"_id" : data._id,"pollans.name" : data.answers},
                {
                    $push:{"pollans.$.voteips": {ip: ip}}
                },
                { new : true })
                .lean().exec(function(err,updatedPoll){
                    if(err){
                        console.log("Error " + err);
                    }else{
                       // res.json(updatedPoll);
                       var userVoted = false,
                       userChoice,
                       totalVotes = 0;

                       for(c in updatedPoll.pollans) {
                        var choice = updatedPoll.pollans[c];
                       // console.log(choice);
                        for(v in choice.voteips) {
                          var vote = choice.voteips[v];
                          totalVotes++;
                          if(vote.ip === ip) {
                            userVoted = true;
                            userChoice = { _id: choice._id, text: choice.name };
                          }
                        }
                    }
                    updatedPoll.userVoted = userVoted;
                    updatedPoll.userChoice = userChoice;
                    updatedPoll.totalVotes = totalVotes;
                      //  console.log(updatedPoll);
                        socket.emit('myvote', updatedPoll._id);
                        socket.broadcast.emit('vote', updatedPoll._id);
                    }
                } );
                
        
    });
    socket.on('disconnect',()=>{
        console.log('User Disconnected');
    });
});



server.listen(port,function(){
    console.log('server running in port' + port);
});


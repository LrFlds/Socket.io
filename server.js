const express = require('express')
const app= express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const md5 = require('MD5');

app.use(express.static('public')); 

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket)=> {
    console.log("User is connect");
    const me = false; 
    socket.on('login', (user)=>{
        me= user.username;
        console.log(user)
        me.id = user.mail.replace('@','-').replace('.','-');
        me.avatar = 'https://gravatar.com/avatar/'+ md5(user.mail) + '?s=50';
        socket.emit("logged");
        io.emit('newUser', me);
    });
    socket.on('disconnect', ()=>{
        if(!me){
            return false
        };
        delete users[me.id];
        io.emit('disUser', me);
    })

    

    socket.on('chat message', (msg) => {
        console.log("Message : " + msg);
        io.emit("chat message", msg);
    });


});


http.listen(3000, ()=>{
    console.log("Server running on, 3000")
});


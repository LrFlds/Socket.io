
const socket = io(); 

      
            const submit = document.getElementById("loginForm");
            submit.addEventListener("submit", (event)=>{
                event.preventDefault();
                socket.emit('login', {
                    username : document.getElementById('username').value,
                    mail : document.getElementById('mail').value         
                })               
            });
               
                socket.on('newUser', (user)=>{
                    const users = getElementById("users");
                    users.append('<img src="'+ user.avatar +'">');
                    alert('Nouvel utilisateur');
                });

        const send =  ()=> {
            const text = document.getElementById('m').value;
            socket.emit("chat message", text);
        };

        const receive = (msg) =>{
            const li= document.createElement("li");
            li.innerText = msg;
            document.getElementById("messages").appendChild(li);
        };
        socket.on("chat message", receive);


 
        




   
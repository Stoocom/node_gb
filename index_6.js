const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index_6.html');
        const readStream = fs.createReadStream(indexPath);
        readStream.pipe(res);
    }));

let usersArray = [];
const io = socket(server);

io.on('connection', client => {
    
    client.on('client-check', name => {
        
        let checkUserName = false;      
        if (usersArray.length >= 1) {
            checkUserName = usersArray.find((user) => user.userName === name);
        }
    
        if (checkUserName) {
            client.broadcast.emit('server-notice', {counter: usersArray.length, note: 'C возвращением'});
        } else {
            usersArray.push({ userName: name, userId: client.id}); 
            client.broadcast.emit('server-notice', {counter: usersArray.length, note: 'Подключился новый пользователь!'});
        }

        client.broadcast.emit('server-online', usersArray);
        client.emit('server-online', usersArray);
    });

    client.on('client-msg', data => {
        let index = usersArray.findIndex((user) => user.userId === client.id)
        const payload = {
            userNameMsg: usersArray[index].userName,
            message: data.message,
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });

    client.on("disconnect", () => {
        let index = usersArray.findIndex((user) => user.userId === client.id)
        usersArray.splice(index, 1);
        client.broadcast.emit('server-online', usersArray);
        client.emit('server-online', usersArray);
        client.broadcast.emit('server-notice', {counter: usersArray.length, note: 'Удалился пользователь!'});
    });

});

server.listen(3000);

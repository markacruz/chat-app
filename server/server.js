const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });

io.on('connect', (socket) => {
    console.log('New user connected!')

    socket.on('join', (data) => {

        const username = data.username;
        const channel = data.channel;

        const { error, user } = addUser({ id: socket.id, username, channel });

        socket.join(channel);

        socket.emit('message', { user: 'admin', text: `Welcome to Channel ${channel}, ${username}` })
        socket.broadcast.to(channel).emit('message', { user: 'admin', text: `${username} has joined the chat.` })

        io.to(channel).emit('channelData', { channel, users: getUsersInRoom(channel) });
    })

    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id);

        io.to(user.channel).emit('message', { user: user.newUsername, text: message });

    });

    socket.on('disconnect', () => {

        const user = getUser(socket.id);

        removeUser(socket.id)
        console.log('User had left!')
    })

});

app.use(router);
app.use(cors());

const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => {
    `Currently listening to PORT ${PORT}`
})
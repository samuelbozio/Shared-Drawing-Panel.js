const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const ipAddress = '192.168.0.57'; // Substitua pelo seu IP local
const PORT = 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Um usuário conectado');

    // Escutar eventos de desenho
    socket.on('draw', (data) => {
        // Emitir evento para todos os clientes, incluindo o remetente
        io.emit('draw', data);
    });

    // Escutar evento de limpeza do desenho
    socket.on('clear', () => {
        // Emitir evento para todos os clientes, incluindo o remetente
        io.emit('clear');
    });

    // Lidar com a desconexão do usuário
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

server.listen(PORT, ipAddress, () => {
    console.log(`Servidor rodando em http://${ipAddress}:${PORT}`);
});

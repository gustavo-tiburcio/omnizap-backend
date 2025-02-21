const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const port = 3000;

// Cria um servidor HTTP para o Express
const server = http.createServer(app);

// Cria uma instância do Socket.IO, configurando o CORS
const io = socketIo(server, {
  cors: {
    origin: '*',  // Permite apenas requisições dessa origem
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }
});

// Conexão do cliente via WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');
    
    // Ouve o evento 'enviarMensagem' e emite a mensagem para todos os clientes
    socket.on('enviarMensagem', (msg) => {
      console.log('Mensagem recebida do cliente:', msg);
      // Emite para todos os clientes, incluindo quem enviou
      io.emit('receberMensagem', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
});

// Inicia o servidor
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

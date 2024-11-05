const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Permitir solicitudes de CORS para conectar con el Frontend
const path = require('path'); // Módulo para manejar rutas de archivos

const app = express();
const server = http.createServer(app);

// Configuración de CORS en Socket.IO
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || "http://localhost:4200", // Dirección del cliente Angular durante el desarrollo o desde variable de entorno
        methods: ["GET", "POST"],
        credentials: true
    }
});

const PORT = process.env.PORT || 3000;

// Habilitar CORS en Express para el cliente Angular
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:4200", credentials: true }));
app.use(express.json()); // Permitir solicitudes JSON

// Configuración para servir archivos estáticos del frontend compilado
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba para verificar la API
app.get('/api/status', (req, res) => {
    res.json({ status: 'API funcionando correctamente' });
});

// Configuración de Socket.IO para manejar conexiones y mensajes en tiempo real
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Escuchar los mensajes enviados por el cliente
    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', data); // Enviar el mensaje a todos los clientes conectados
    });

    // Detectar desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Ruta comodín para manejar todas las rutas del frontend (Angular)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor API ejecutándose en http://localhost:${PORT}`);
});
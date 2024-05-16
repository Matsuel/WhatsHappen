import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

export const initServer = () => {
    try {
        const app = express();
        app.use(cors())
        const server = createServer(app);
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            },
            maxHttpBufferSize: 1e9
        });
        return {server, io}
    } catch (error) {
        console.log(error);        
    }
}
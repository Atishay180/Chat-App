import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// create a server
const server = http.createServer(app);

// create a socket
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})

export const getRecieverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// create a map to store the user and socket id
const userSocketMap = {};  // {userId: socketId}

// function to connect the socket
io.on("connection", (socket) => {
    // get the userId from the query
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // function to get online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // function to disconnect the socket
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});

export { app, io, server };
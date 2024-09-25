import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"

import connectMongoDB from "./db/connectMongoDB.js"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import { app, server } from "./socket/socket.js"

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server is ready")
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB();
})

import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import path from "path"

import connectMongoDB from "./db/connectMongoDB.js"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import { app, server } from "./socket/socket.js"

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)


// --------------------------------------deployment--------------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
    })
}
else {
    app.get("/", (req, res) => {
        res.send("API is running")
    })
}

// --------------------------------------deployment--------------------------------------

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB();
})

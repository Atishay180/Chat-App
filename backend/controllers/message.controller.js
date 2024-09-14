import { populate } from "dotenv"
import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"


const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        if (!message) {
            return res
                .status(400)
                .json({ error: "Message content is required" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()

        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        return res
            .status(200)
            .json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        return res
            .status(500)
            .json({ error: "Internal Server Error" });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")   //populate helps to get the actual message object instead of just the id

        if (!conversation) {
            return res
                .status(200)
                .json([])
        }

        const messages = conversation.messages

        return res
            .status(200)
            .json(messages)


    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        return res
            .status(500)
            .json({ error: "Internal Server Error" });

    }
}


export { sendMessage, getMessages }
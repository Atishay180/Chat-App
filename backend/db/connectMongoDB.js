import mongoose from "mongoose"
import { DB_NAME } from "../contants.js"


const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error connection to mongoDB: ${error.message}`);
        process.exit();
    }
}

export default connectMongoDB
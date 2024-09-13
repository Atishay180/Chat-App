import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";


const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "Password do not match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res
                .status(201)
                .json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic
                })
        }
        else {
            return res
                .status(400)
                .json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller: ", error.message)
        return res
            .status(500)
            .json({ error: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Please fill all the fields" })
        }

        const user = await User.findOne({ username })

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid username or password" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller: ", error.message)
        return res
            .status(500)
            .json({ error: "Internal Server Error" })

    }
}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return res
            .status(200)
            .json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller: ", error.message)
        return res
            .status(500)
            .json({ error: "Internal Server Error" })

    }
}

export { signup, login, logout }
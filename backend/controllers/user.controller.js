import { User } from "../models/user.model.js";


const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        //get all users except the logged in user, "ne" means not equal
        const filteredUsers = await User
            .find({ _id: { $ne: loggedInUserId } })
            .select("-password")

        return res
            .status(200)
            .json(filteredUsers)

    } catch (error) {
        console.log("Error in getUserForSidebar controller: ", error.message);
        return res
            .status(500)
            .json({ error: "Internal Server Error" });

    }
}

export { getUserForSidebar }
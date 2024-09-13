import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"})

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,   // days * hours * minutes * seconds * milliseconds
        httpOnly: true,  // cookie cannot be accessed by client side javascript
        sameSite: "strict", // csrf protection by not allowing other domains to access the cookie
        secure: process.env.NODE_ENV !== "development",
    })
}

export default generateTokenAndSetCookie
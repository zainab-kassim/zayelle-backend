import { generateAccessToken, generateRefreshToken } from "../auth/auth.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { refreshSecretKey } from "../auth/config.js";
import { setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken } from "../utils/authCookies.js";



export const SignUpUser = async (req, res) => {
    const { username, password, email, phoneNumber } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) { console.log("user already exists") }

    const HashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        username,
        password: HashedPassword,
        email,
        phoneNumber
    })
    await newUser.save();

    const accessToken = generateAccessToken(newUser)
    const refreshToken = generateRefreshToken(newUser)

    setAccessToken(res, accessToken)
    setRefreshToken(res, refreshToken)

    return res.status(200).json({ message: "user created successfully",username,accessToken })
};





export const SignInUser = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        setAccessToken(res, accessToken)
        setRefreshToken(res, refreshToken)

        res.status(200).json({ message: "user Signed in successfully",accessToken })
    } else {
        return res.status(400).json({ message: "Incorrect username or password" })
    }
}


export const LogOutUser = async (req, res) => {
    removeAccessToken(req.cookies?.accessToken)
    removeRefreshToken(req.cookies?.refreshToken)
    return res.status(200).json({ message: "Logged Out successfully!!" })
}



export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken) {
        return res.status(404).json({ message: "You do not have access, PLEASE LOG IN AGAIN!!" })
    }

    // verify Token 
    jwt.verify(refreshToken, refreshSecretKey, function (err, user) {
        if (err) {
            return res.status(403).json({ message: "SESSION TIMED OUT, PLEASE LOG IN AGAIN!!" })
        }

        const accessToken = generateAccessToken(user)
        setAccessToken(res, accessToken)

        return res.status(200).json({ message: "Token refreshed successfully!!" })
    });
}
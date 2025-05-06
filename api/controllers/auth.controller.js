import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword =  bcrypt.hashSync(password, 10);   //hashSync is await action for the hash 
    // 10 is the number of rounds to hash the password and it help to encrypt the password
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json("User has been created!");
    } catch (error) {
        next(error);
    }
    
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(404, "User not found!"));
        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword) return next(errorHandler(400, "Wrong credentials!"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc; 
        res
            .cookie("access_token", token, { httpOnly: true })//no other 3rd party have access to the cookie
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
    
};
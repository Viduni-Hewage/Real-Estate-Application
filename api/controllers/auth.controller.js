import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

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
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).send({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send({ message: 'Invalid password' });
        const token = jwt.sign({ email:user.email , id: user._id }, 'secretlyouday');
        res.status(200).send({result: user, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    } 
        
}


export const signup = async (req, res) => {
    const { firstName,lastName, email, password , confirmPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).send({ message: 'User already exists' });
        if (password !== confirmPassword) return res.status(400).send({ message: 'Passwords do not match' });
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ name:`${firstName} ${lastName}`, email, password: hash });

        const token = jwt.sign({ email:newUser.email , id: newUser._id }, 'secretlyouday', { expiresIn: '24h' });

        await newUser.save();
        res.status(201).send({ result : newUser,token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({ result: user });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
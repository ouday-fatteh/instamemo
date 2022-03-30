import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Postroutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000 ;


app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use('/api',Postroutes);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser:true , useUnifiedTopology:true })
.then(() => app.listen(PORT , () => console.log(`Server up and running on ${PORT}`)))
.catch((err) => console.log(err.message));

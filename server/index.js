import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';
import dotenv from 'dotenv';


const app = express();
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
dotenv.config();


const PORT = process.env.PORT || 5000 ;
const CONNECTION_URL = 'mongodb+srv://ouday11:ouday1999@cluster0.vng4x.mongodb.net/memogram?retryWrites=true&w=majority'

app.use(cors(corsOptions));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use('/api',postRoutes);
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

mongoose.connect(CONNECTION_URL, { useNewUrlParser:true , useUnifiedTopology:true })
.then(() => app.listen(PORT , () => console.log(`Server up and running on ${PORT}`)))
.catch((err) => console.log(err.message));

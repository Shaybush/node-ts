import express, { NextFunction, Request, Response } from 'express';
import userRouter from './routers/user.router';
import basketRouter from './routers/basket.router';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use((express.json()));
app.use(cors({
    methods: ['GET', 'DELETE'],
    origin: ['http://localhost:3001'],
    credentials: true
}))
app.use(helmet());
console.log("I'm second branch!!!!");

app.use('/user', userRouter);
app.use('/basket', basketRouter);

app.get('/health', (req, res, next) => {
    next(new Error('error'))
    res.status(200).json({ message: 'OK' })
});

// error handling 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(400).json({ message: error.message });
})

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})


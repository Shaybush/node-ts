import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from './utils/environment-variables';
import { RedisConnection } from './utils/redisConnection';
import { MongoConnection } from './utils/mongoConnection';
import orderSchema from './models/order.model';
import userRouter from './routers/user.router';
import basketRouter from './routers/basket.router';
import blogRouter from './routers/blog.router';

const app = express();

app.use((express.json()));
app.use(cors({
    methods: ['GET', 'POST', 'DELETE'],
    origin: ['http://localhost:3005'],
    credentials: true
}))
app.use(helmet());

// connect to redis and mongodb
RedisConnection.getInstance().connect();
MongoConnection.getInstance().connect();

app.use('/user', userRouter);
app.use('/basket', basketRouter);
app.use('/blog', blogRouter);

app.get('/health', (req, res, next) => {
    next(new Error('error'))
    res.status(200).json({ message: 'OK' })
});

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(400).json({ message: error.message });
})


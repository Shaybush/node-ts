import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from './utils/environment-variables';
import { RedisConnection } from './utils/redisConnection';
import userRouter from './routers/user.router';
import basketRouter from './routers/basket.router';
import mongoose from 'mongoose';
import orderModel from './models/order.model';

const app = express();

app.use((express.json()));
app.use(cors({
    methods: ['GET', 'DELETE'],
    origin: ['http://localhost:3005'],
    credentials: true
}))
app.use(helmet());
// connect to redis
RedisConnection.getInstance().connect();


async function connectDB() {
    console.log("trying to connect mongoDB");
    mongoose.connect('mongodb://127.0.0.1:27017/Class4')
        .then(() => console.log("connected successfully to mongoDB"))
        .catch((error) => console.error(error))
}

const main = async () => {
    await connectDB();

    console.time('find');
    const res = await orderModel.find({
        'customer_name': { $regex: '^S', $options: 'i' },
        'total': { $gt: 30 }
    }).limit(5);
    console.timeEnd('find');

    console.log(res.length);

    app.get('/health', (req, res, next) => {
        next(new Error('error'))
        res.status(200).json({ message: 'OK' })
    });

    app.use('/user', userRouter);
    app.use('/basket', basketRouter);
    app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
        console.log("I'm here !!!");
        try {
            await orderModel.insertOne({
                customer_name: 'Shaun Thiel',
                total: 30
            });
        } catch (error) {
            next(error);
        }
    });

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(400).json({ message: error.message });
    })
}

main();

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})


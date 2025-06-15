import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from './utils/environment-variables';
import { RedisConnection } from './utils/redisConnection';
import { MongoDBConnection } from './utils/mongodb';
import userRouter from './routers/user.router';
import basketRouter from './routers/basket.router';
import orderRouter from './routers/order.router';
import { watchUserLifecycleEvents } from './utils/userChangeStream';

const app = express();

app.use((express.json()));
app.use(cors({
    methods: ['GET', 'DELETE'],
    origin: ['http://localhost:3005'],
    credentials: true
}))
app.use(helmet());

async function main() {
    // connect to redis
    RedisConnection.getInstance().connect();
    // connect to mongo
    await MongoDBConnection.getInstance().connect();
    // start user lifecycle change stream watcher
    // watchUserLifecycleEvents();

    app.get('/health', (req: Request, res: Response, _next: NextFunction) => {
        res.status(200).json({ message: 'OK' })
    });

    app.use('/user', userRouter);
    app.use('/basket', basketRouter);
    app.use('/order', orderRouter);

    // error handling
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        res.status(400).json({ message: error.message });
    })
}

main();

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})


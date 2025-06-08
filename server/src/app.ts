import express, { NextFunction, Request, Response } from 'express';
import userRouter from './routers/user.router';
import basketRouter from './routers/basket.router';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from './utils/environment-variables';
import { RedisConnection } from './utils/redisConnection';

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

import mongoose from 'mongoose';
import orderModel from './models/order.model';

// app.use('/user', userRouter);
// app.use('/basket', basketRouter);

// app.get('/health', (req, res, next) => {
//     next(new Error('error'))
//     res.status(200).json({ message: 'OK' })
// });

// // error handling 
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(error);
//     res.status(400).json({ message: error.message });
// })
async function connectDB() {
    console.log("trying to connect mongoDB");
    mongoose.connect('mongodb://127.0.0.1:27017/Class4')
        .then(() => console.log("connected successfully to mongoDB"))
        .catch((error) => console.error(error))
}

connectDB()
    .then(async () => {
        const res = await orderModel.find({});
        // console.log(res);
    })
    .then(async () => {
        // const res1 = await orderModel.insertOne({
        //     items: {
        //         product_name: 'Laptop',
        //         price: 1200,
        //         quantity: 2,
        //         tags: ['electronics', 'computer']
        //     },
        //     actual_amount: 2400,
        //     expected_amount: 2500,
        //     status: 'completed'
        // })
        // console.log(res1);

    })
    .then(async () => {
        const page = 1;
        const pageSize = 5;
        const res = await orderModel.aggregate([
            // 1️⃣ Add a computed sum field (optional, just to illustrate)
            {
                $addFields: {
                    sum: { $multiply: ['$items.price', '$items.quantity'] }
                }
            },
            // 2️⃣ Facet to separate results and metadata
            {
                $facet: {
                    data: [
                        { $skip: (page - 1) * pageSize },
                        { $limit: pageSize }
                    ],
                    metadata: [
                        { $count: 'total' },
                        {
                            $addFields: {
                                page: page,
                                pageSize: pageSize,
                                totalPages: {
                                    $ceil: { $divide: ['$total', pageSize] }
                                }
                            }
                        }
                    ]
                }
            },
            // 3️⃣ Reshape the output (optional)
            {
                $project: {
                    data: 1,
                    metadata: { $arrayElemAt: ['$metadata', 0] }
                }
            }
        ])
        console.log(res);

    })

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})


import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from './utils/environment-variables';
import { RedisConnection } from './utils/redisConnection';
import mongoose from 'mongoose';
import orderSchema from './models/order.model';
import userRouter from './routers/user.router';
import basketRouter from './routers/basket.router';

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

app.use('/user', userRouter);
app.use('/basket', basketRouter);

app.get('/health', (req, res, next) => {
    next(new Error('error'))
    res.status(200).json({ message: 'OK' })
});


async function connectDB() {
    console.log("trying to connect mongoDB");
    mongoose.connect('mongodb://127.0.0.1:27017/Class4')
        .then(() => console.log("connected successfully to mongoDB"))
        .catch((error) => console.error(error))
}

connectDB()
    .then(async () => {
        const res = await orderSchema.find({});
        console.log(res);
        // Indexes and hooks are now defined in the schema file
    })
    .then(async () => {
        // const res1 = await orderSchema.insertOne({
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
        const pageSize = 20;
        /**
         *
         * {
         *  price: 40,
         *  name: 'mouse'
         * }
         *  {
         *  price: 32,
         *  name: 'keyboard'
         * }
         * sum: 72
         */
        const res = await orderSchema.aggregate([
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
                        { $limit: pageSize } // 1: 0 - 20 2: 20 - 40, 3: 40 - 60
                    ],
                    metadata: [ // total: 5137
                        { $count: 'total' },
                        {
                            $addFields: {
                                page: page, // 1
                                pageSize: pageSize, // 20
                                totalPages: {
                                    $ceil: { $divide: ['$total', pageSize] } // 4
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

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(400).json({ message: error.message });
})


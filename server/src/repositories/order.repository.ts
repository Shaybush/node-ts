import { Collection, Db, ObjectId } from 'mongodb';
import { Order } from '../models/order.model';
import { MongoDBConnection } from '../utils/mongodb';

export class OrderRepository {
    private static instance: OrderRepository;
    private db: Db;
    private collection: Collection<Order>;

    private constructor() {
        this.db = MongoDBConnection.getInstance().getDb();
        this.collection = this.db.collection('orders');
    }

    static getInstance(): OrderRepository {
        if (!OrderRepository.instance) {
            OrderRepository.instance = new OrderRepository();
        }
        return OrderRepository.instance;
    }

    async getOrders(): Promise<Order[]> {
        const docs = await this.collection.find({}).toArray();
        return docs.map((doc: any) => ({
            _id: doc._id?.toString(),
            customer_name: doc.customer_name,
            timestamp: doc.timestamp,
            product_ids: doc.product_ids,
            total: doc.total,
        }));
    }

    async addOrder(order: Omit<Order, '_id'>): Promise<Order> {
        const result = await this.collection.insertOne(order);
        return { ...order, _id: result.insertedId.toString() };
    }

    async deleteOrder(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount === 1;
    }

    async editOrder(id: string, order: Partial<Order>): Promise<void> {
        await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: order }
        );
    }

    async getOrdersWithAggregation(page: number, pageSize: number = 20) {
        const aggRes = await this.collection.aggregate([
            {
                $addFields: {
                    sum: { $multiply: ['$items.price', '$items.quantity'] }
                }
            },
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
            {
                $project: {
                    data: 1,
                    metadata: { $arrayElemAt: ['$metadata', 0] }
                }
            }
        ]).toArray();
        return aggRes;
    }
}

export const getOrderRepository = OrderRepository.getInstance; 
import { Db, ObjectId } from 'mongodb';

// Order schema example based on MongoDB docs and typical e-commerce structure
// This is a TypeScript type for clarity, not enforced in MongoDB
export type Order = {
    _id?: ObjectId | string;
    customer_name: string;
    timestamp: string;
    product_ids: string[];
    total: number;
    // You can add more fields as needed, e.g., status, shipping info, etc.
};

// Ensures indexes for the 'orders' collection
export async function ensureOrderIndexes(db: Db) {
    const orders = db.collection('orders');
    // Example: create an index on timestamp for efficient sorting/filtering
    await orders.createIndex({ timestamp: 1 });
    // Example: create an index on customer_name for search
    await orders.createIndex({ customer_name: 1 });
    // Example: create a compound index on product_ids and total
    await orders.createIndex({ product_ids: 1, total: 1 });
}
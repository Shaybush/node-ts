import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/Class4';

export class MongoDBConnection {
    private static instance: MongoDBConnection;
    private client: MongoClient | null = null;
    private db: Db | null = null;

    static getInstance(): MongoDBConnection {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = new MongoDBConnection();
        }
        return MongoDBConnection.instance;
    }

    async connect() {
        if (!this.client) {
            this.client = new MongoClient(uri);
            await this.client.connect();
            this.db = this.client.db();
            console.log('Connected to MongoDB');
        }
        return this.db;
    }

    getDb(): Db {
        if (!this.db) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.db;
    }

    getClient(): MongoClient {
        if (!this.client) {
            throw new Error('MongoClient not initialized. Call connect() first.');
        }
        return this.client;
    }
} 
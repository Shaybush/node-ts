import mongoose, { Connection } from 'mongoose';
import { MONGO_URI } from './environment-variables';

export interface IMongoConnection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
    getConnection(): Connection;
}

export class MongoConnection implements IMongoConnection {
    private connection: Connection | null = null;
    // TODO: add logger later
    // private logger = new WinstonLogger('MongoDB');
    private static instance: MongoConnection;

    private constructor() { } // Make constructor private for singleton pattern

    async connect(): Promise<void> {
        try {
            await mongoose.connect(MONGO_URI);
            this.connection = mongoose.connection;

            // Set up error handling
            this.connection.on('error', (error) => {
                console.error('MongoDB Client Error', error);
                // this.logger.error('MongoDB Client Error', error);
            });

            this.connection.on('disconnected', () => {
                console.log('MongoDB disconnected');
                // this.logger.info('MongoDB disconnected');
            });

            console.log('Connected to MongoDB');
            // this.logger.info('Connected to MongoDB');
        } catch (error) {
            console.error('MongoDB connection failed', error);
            // this.logger.error('MongoDB connection failed', error);
            throw error;
        }
    }

    static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await mongoose.disconnect();
            this.connection = null;
            console.log('Disconnected from MongoDB');
            // this.logger.info('Disconnected from MongoDB');
        }
    }

    isConnected(): boolean {
        return this.connection?.readyState === 1;
    }

    getConnection(): Connection {
        if (!this.connection) throw new Error('MongoDB Connection is not initialized');
        return this.connection;
    }
}

// Export the singleton instance getter
export const getMongoConnection = MongoConnection.getInstance;

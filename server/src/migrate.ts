import { faker } from '@faker-js/faker';
import { MongoDBConnection } from './utils/mongodb';
import { Order } from './models/order.model';
import { TechItem } from './data/basket.stub';
import { User } from './types/user.types';

async function seedOrders(db: any) {
    const orders: Order[] = Array.from({ length: 20 }, () => ({
        customer_name: faker.person.fullName(),
        timestamp: faker.date.recent().toISOString(),
        product_ids: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.string.uuid()),
        total: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
    }));
    await db.collection('orders').deleteMany({});
    await db.collection('orders').insertMany(orders);
}

async function seedUsers(db: any) {
    const statuses: User['status'][] = ['relationship', 'complicated', 'single'];
    const users: User[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 70 }),
        visits: faker.number.int({ min: 0, max: 1000 }),
        progress: faker.number.int({ min: 0, max: 100 }),
        status: faker.helpers.arrayElement(statuses),
        createdAt: faker.date.past(),
    }));
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(users);
}

async function seedBasket(db: any) {
    const categories = ['Laptops', 'Smartphones', 'Headphones', 'Peripherals', 'Graphics Cards', 'Storage', 'Memory', 'Motherboards', 'Keyboards', 'Monitors', 'Tablets', 'Gaming Consoles'];
    const brands = ['Apple', 'Dell', 'Samsung', 'Sony', 'Bose', 'Logitech', 'Razer', 'ASUS', 'MSI', 'Seagate', 'Corsair', 'LG', 'Microsoft'];
    const basket: TechItem[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(categories),
        brand: faker.helpers.arrayElement(brands),
        price: faker.number.int({ min: 50, max: 2500 }),
        quantity: faker.number.int({ min: 1, max: 5 }),
    }));
    await db.collection('basket').deleteMany({});
    await db.collection('basket').insertMany(basket);
}

async function main() {
    const mongo = MongoDBConnection.getInstance();
    await mongo.connect();
    const db = mongo.getDb();
    await seedOrders(db);
    await seedUsers(db);
    await seedBasket(db);
    console.log('✅ Migration complete: Mock data seeded for orders, users, and basket collections.');
    process.exit(0);
}

main().catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
}); 
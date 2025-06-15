import { getOrderRepository } from '../repositories/order.repository';
import { Order } from '../models/order.model';

const getOrders = async (): Promise<Order[]> => {
    try {
        const orderRepository = getOrderRepository();
        return await orderRepository.getOrders();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const addOrder = async (order: Omit<Order, '_id'>) => {
    try {
        const orderRepository = getOrderRepository();
        return await orderRepository.addOrder(order);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const deleteOrder = async (id: string) => {
    try {
        const orderRepository = getOrderRepository();
        const isDeleted = await orderRepository.deleteOrder(id);
        if (!isDeleted) {
            throw new Error('Order not found');
        }
        return await orderRepository.getOrders();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const editOrder = async (id: string, order: Partial<Order>) => {
    try {
        const orderRepository = getOrderRepository();
        await orderRepository.editOrder(id, order);
        return await orderRepository.getOrders();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const getOrdersWithAggregation = async (page: number, pageSize: number = 20) => {
    try {
        const orderRepository = getOrderRepository();
        return await orderRepository.getOrdersWithAggregation(page, pageSize);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export { getOrders, addOrder, deleteOrder, editOrder, getOrdersWithAggregation }; 
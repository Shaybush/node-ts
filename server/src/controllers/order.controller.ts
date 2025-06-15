import { NextFunction, Request, Response } from 'express';
import { getOrders, addOrder, deleteOrder, editOrder, getOrdersWithAggregation } from '../services/order.service';

export const orderController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await getOrders();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    },
    addOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await addOrder(req.body);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    },
    deleteOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await deleteOrder(req.params.id);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    },
    editOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await editOrder(req.params.id, req.body);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    },
    getPaginated: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 20;
            const result = await getOrdersWithAggregation(page, pageSize);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}; 
import { NextFunction, Request, Response } from 'express';
import { addItem, deleteItem, editItem, getBasket } from '../services/basket.service';

export const basketController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await getBasket();
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    },
    /** TODO - add here more ...  */
    addItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await addItem(req.body);
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    },
    deleteItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await deleteItem(+req.params.id);
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    },
    editItem: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await editItem(+req.params.id, req.body);
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
}
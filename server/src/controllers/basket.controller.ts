import { NextFunction, Request, Response } from 'express';
import { getBasket } from '../services/basket.service';

export const basketController = {
    getAll: (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = getBasket();
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
    /** TODO - add here more ...  */
}
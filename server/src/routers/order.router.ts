import express, { Request, Response, NextFunction } from 'express';
import { orderController } from '../controllers/order.controller';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    console.info(12, 'Call to ORDERS API', {
        method: req.method,
        originalUrl: req.originalUrl,
        body: req.body
    });
    next();
});

router.get('/', orderController.getAll);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id', orderController.editOrder);
router.post('/', orderController.addOrder);
router.get('/paginated', orderController.getPaginated);

export = router; 
import express from 'express';
import { blogController } from '../controllers/blog.controller';

const router = express.Router();

router.post('/api/posts', blogController.createPost);
router.get('/api/posts', blogController.getAll);
router.get('/api/posts/getByContext', blogController.getByContext); // query - context string
router.get('/api/posts/:id', blogController.getById);
router.delete('/api/posts/:id', blogController.delete);

export = router;
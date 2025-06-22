import { NextFunction, Request, Response } from "express";
import {
    createPostService,
    getAllPostsService,
    getPostByIdService,
    deletePostService,
    getPostsByContextService
} from "../services/blog.service";
import { validBlog } from "../validations/blog.validation";

export const blogController = {
    createPost: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, content } = req.body;
            if (!title || !content) {
                throw new Error('Title and content are required');
            }

            const validBlog2 = validBlog(req.body);
            if (!validBlog2) {
                throw new Error(validBlog2.details[0].message);
            }

            const newPost = await createPostService(req.body);
            res.status(201).json({
                success: true,
                data: newPost,
                message: 'Post created successfully'
            });
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error('Post ID is required');
            }

            const post = await getPostByIdService(id);
            res.status(200).json({
                success: true,
                data: post,
                message: 'Post retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await getAllPostsService();
            res.status(200).json({
                success: true,
                data: posts,
                message: posts.length > 0 ? 'Posts retrieved successfully' : 'No posts found'
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error('Post ID is required');
            }

            await deletePostService(id);
            res.status(200).json({
                success: true,
                message: 'Post deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    },

    getByContext: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { context } = req.query;
            if (!context || typeof context !== 'string') {
                throw new Error('Context string is required in query parameters');
            }

            const posts = await getPostsByContextService(context);
            res.status(200).json({
                success: true,
                data: posts,
                message: posts.length > 0 ? 'Posts found' : 'No posts found'
            });
        } catch (error) {
            next(error);
        }
    }
}
/**
 * 
 * router.post('/api/posts', () => { });
router.get('/api/posts', () => { });
router.get('/api/posts/:id', () => { });
router.delete('/api/posts/:id', () => { });
router.get('/api/posts/getByContext', () => { });
 */
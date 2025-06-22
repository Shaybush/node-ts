import blogSchema, { Blog } from "../models/blog.model";
import { MongoConnection } from "../utils/mongoConnection";
import { Document } from 'mongoose';

type BlogWithId = Blog & Document;

export class BlogRepository {
    private static instance: BlogRepository;
    private mongoConnection: MongoConnection;

    private constructor() {
        this.mongoConnection = MongoConnection.getInstance();
    }

    static getInstance(): BlogRepository {
        if (!BlogRepository.instance) {
            BlogRepository.instance = new BlogRepository();
        }
        return BlogRepository.instance;
    }

    async createPost(blog: Blog): Promise<BlogWithId> {
        const newBlog = new blogSchema(blog);
        return await newBlog.save();
    }

    async getAllPosts(): Promise<BlogWithId[]> {
        return await blogSchema.find({}).sort({ createdAt: -1 });
    }

    async getPostById(id: string): Promise<BlogWithId | null> {
        return await blogSchema.findById(id);
    }

    async deletePost(id: string): Promise<boolean> {
        const result = await blogSchema.findByIdAndDelete(id);
        return result !== null;
    }

    async getPostsByContext(context: string): Promise<BlogWithId[]> {
        return await blogSchema.find({
            $or: [
                { title: { $regex: context, $options: 'i' } },
                { content: { $regex: context, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
    }
}

// Export the singleton instance getter
export const getBlogRepository = BlogRepository.getInstance;
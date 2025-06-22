import axios from 'axios';
import {
    CreateBlogRequest,
    SearchBlogRequest,
    BlogApiResponse,
    SingleBlogApiResponse,
} from '../types/blog.types';

const BASE_URL = 'http://localhost:5002';

export const blogApi = {
    // Get all posts
    getAllPosts: async (): Promise<BlogApiResponse> => {
        const response = await axios.get<BlogApiResponse>(`${BASE_URL}/blog/api/posts`);
        return response.data;
    },

    // Get post by ID
    getPostById: async (id: string): Promise<SingleBlogApiResponse> => {
        const response = await axios.get<SingleBlogApiResponse>(`${BASE_URL}/blog/api/posts/${id}`);
        return response.data;
    },

    // Create new post
    createPost: async (data: CreateBlogRequest): Promise<SingleBlogApiResponse> => {
        const response = await axios.post<SingleBlogApiResponse>(`${BASE_URL}/blog/api/posts`, data);
        return response.data;
    },

    // Delete post
    deletePost: async (id: string): Promise<{ success: boolean; message?: string }> => {
        const response = await axios.delete<{ success: boolean; message?: string }>(
            `${BASE_URL}/blog/api/posts/${id}`
        );
        return response.data;
    },

    // Search posts by context
    searchByContext: async (searchData: SearchBlogRequest): Promise<BlogApiResponse> => {
        const response = await axios.get<BlogApiResponse>(`${BASE_URL}/blog/api/posts/getByContext`, {
            params: { context: searchData.context },
        });
        return response.data;
    },
}; 
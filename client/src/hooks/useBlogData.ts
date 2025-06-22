import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { blogApi } from '../api/blog.api';
import {
    CreateBlogRequest,
    BlogApiResponse,
    SingleBlogApiResponse,
} from '../types/blog.types';

// Custom debounce hook
const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Query keys
export const BLOG_QUERY_KEYS = {
    all: ['blogs'] as const,
    lists: () => [...BLOG_QUERY_KEYS.all, 'list'] as const,
    list: (filters?: string) => [...BLOG_QUERY_KEYS.lists(), filters] as const,
    details: () => [...BLOG_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...BLOG_QUERY_KEYS.details(), id] as const,
    search: (context?: string) => [...BLOG_QUERY_KEYS.all, 'search', context] as const,
};

// Hook to get all blog posts
export const useGetAllPosts = () => {
    return useQuery<BlogApiResponse, Error>({
        queryKey: BLOG_QUERY_KEYS.lists(),
        queryFn: blogApi.getAllPosts,
        refetchOnWindowFocus: false,
    });
};

// Hook to get a single blog post by ID
export const useGetPostById = (id: string) => {
    return useQuery<SingleBlogApiResponse, Error>({
        queryKey: BLOG_QUERY_KEYS.detail(id),
        queryFn: () => blogApi.getPostById(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });
};

// Hook to search posts by context with debouncing
export const useSearchByContext = (context: string, enabled: boolean = false) => {
    const debouncedContext = useDebounce(context, 500); // 500ms debounce delay

    return useQuery<BlogApiResponse, Error>({
        queryKey: BLOG_QUERY_KEYS.search(debouncedContext),
        queryFn: () => blogApi.searchByContext({ context: debouncedContext }),
        enabled: enabled && !!debouncedContext.trim(),
        refetchOnWindowFocus: false,
    });
};

// Hook to create a new blog post
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation<SingleBlogApiResponse, Error, CreateBlogRequest>({
        mutationFn: blogApi.createPost,
        onSuccess: () => {
            // Invalidate and refetch blog posts list
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.lists() });
        },
        onError: (error) => {
            console.error('Error creating post:', error);
        },
    });
};

// Hook to delete a blog post
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation<{ success: boolean; message?: string }, Error, string>({
        mutationFn: blogApi.deletePost,
        onSuccess: (_, deletedId) => {
            // Invalidate lists
            queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.lists() });
            // Remove specific post from cache
            queryClient.removeQueries({ queryKey: BLOG_QUERY_KEYS.detail(deletedId) });
        },
        onError: (error) => {
            console.error('Error deleting post:', error);
        },
    });
};

import { Blog } from "../models/blog.model"
import { getBlogRepository } from "../repositories/blog.repository"
import { Document } from 'mongoose'

type BlogWithId = Blog & Document

const createPostService = async (body: Blog): Promise<BlogWithId> => {
    try {
        const blogRepository = getBlogRepository()
        return await blogRepository.createPost(body)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const getAllPostsService = async (): Promise<BlogWithId[]> => {
    try {
        const blogRepository = getBlogRepository()
        return await blogRepository.getAllPosts()
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const getPostByIdService = async (id: string): Promise<BlogWithId> => {
    try {
        const blogRepository = getBlogRepository()
        const post = await blogRepository.getPostById(id)
        if (!post) {
            throw new Error('Post not found')
        }
        return post
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const deletePostService = async (id: string): Promise<void> => {
    try {
        const blogRepository = getBlogRepository()
        const isDeleted = await blogRepository.deletePost(id)
        if (!isDeleted) {
            throw new Error('Post not found')
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const getPostsByContextService = async (context: string): Promise<BlogWithId[]> => {
    try {
        const blogRepository = getBlogRepository()
        return await blogRepository.getPostsByContext(context)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {
    createPostService,
    getAllPostsService,
    getPostByIdService,
    deletePostService,
    getPostsByContextService
}
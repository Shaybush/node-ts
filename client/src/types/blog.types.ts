export interface IBlog {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBlogRequest {
    title: string;
    content: string;
}

export interface SearchBlogRequest {
    context: string;
}

export interface BlogApiResponse {
    success: boolean;
    data: IBlog[];
    message?: string;
}

export interface SingleBlogApiResponse {
    success: boolean;
    data: IBlog;
    message?: string;
} 
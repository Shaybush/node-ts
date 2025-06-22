import mongoose from 'mongoose';
const { Schema } = mongoose;

export type Blog = {
    title: string;
    content: string
}

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const blogSchema = mongoose.model<Blog>('Blogs', schema);
export default blogSchema;
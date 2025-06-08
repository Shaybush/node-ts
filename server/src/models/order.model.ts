import mongoose from 'mongoose';
const { Schema } = mongoose;

type orderSchema = {
    items: any;
    actual_amount: any;
    expected_amount: any;
    status: 'completed' | 'canceled' | 'denied'
}

const orderSchema = new Schema({
    items: {
        product_name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        tags: { type: [String], required: true }
    },
    actual_amount: { type: Number, required: true },
    expected_amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['completed', 'canceled', 'denied'],
        required: true
    }
}, { timestamps: true });  // adds createdAt and updatedAt

const orderModel = mongoose.model<orderSchema>('Order', orderSchema);
export default orderModel;
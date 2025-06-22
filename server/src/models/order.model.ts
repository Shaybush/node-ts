import mongoose from 'mongoose';
const { Schema } = mongoose;

type OrderSchema = {
    items: any;
    actual_amount: any;
    expected_amount: any;
    status: 'completed' | 'canceled' | 'denied'
}

const schema = new Schema({
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

// Add a compound index (example: on actual_amount and status)
schema.index({ actual_amount: 1, status: 1 });

// Example pre-save hook
schema.pre('save', function (next) {
    console.log('About to save an order');
    next();
});

// Example post hooks
schema.post('init', function (doc) {
    console.log('%s has been initialized from the db', doc._id);
});
schema.post('validate', function (doc) {
    console.log('%s has been validated (but not saved yet)', doc._id);
});
schema.post('save', function (doc) {
    console.log('%s has been saved', doc._id);
});
schema.post('deleteOne', function (doc) {
    console.log('%s has been deleted', doc._id);
});

const orderSchema = mongoose.model<OrderSchema>('Orders', schema);
export default orderSchema;
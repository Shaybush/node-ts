import mongoose from 'mongoose';
const { Schema } = mongoose;

type OrderSchema = {
    customer_name: string;
    timestamp: Date | number;
    total: number;
    product_ids?: string[];
}

const orderSchema = new Schema({
    product_ids: { type: Array, required: false },
    customer_name: { type: String, required: true },
    timestamp: { type: Date, required: true },
    total: { type: Number, required: true }
}, { timestamps: true });  // adds createdAt and updatedAt

// indexes - if we repeat the same item, we can use the index to find the item
orderSchema.index({ 'items.product_name': 1 });
orderSchema.index({ 'items.customer_name': 1 });
orderSchema.index({ 'customer_name': 1, 'total': 1 });

// Example pre-save hook
orderSchema.pre('deleteOne', function (next) {
    console.log('Hello from pre-deleteOne hook');
    next();
});

orderSchema.post('validate', function (doc, next) {
    console.log('%s has been validated (but not saved yet)', doc._id);

    next();
});

orderSchema.pre('validate', function (next) {
    type OrderSchemaWithID = OrderSchema & { _id: string };
    const body = this as unknown as OrderSchemaWithID;
    if (body.customer_name.length < 3) {
        throw (new Error('Customer name must be at least 3 characters long'));
    }
    if (body.total < 0) {
        throw (new Error('Total must be greater than 0'));
    }
    if (!(body.timestamp instanceof Date)) {
        throw (new Error('Timestamp must be a date'));
    }

    console.log("I'm hereeeeeee !!!!");
    next();
});

const orderModel = mongoose.model<OrderSchema>('Order', orderSchema);
export default orderModel;
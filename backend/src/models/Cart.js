const { mongoose, locationSchema } = require('./common');
const item = new mongoose.Schema({ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true }, quantity: { type: Number, required: true, min: 1 }, priceAtAddTime: { type: Number, required: true, min: 0 } }, { timestamps: true });
const schema = new mongoose.Schema({ customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, unique: true }, items: [item], couponCode: String, deliveryLocation: locationSchema, pricingSummary: { subtotal: Number, deliveryFee: Number, platformFee: Number, discount: Number, grandTotal: Number } }, { timestamps: true });
module.exports = mongoose.model('Cart', schema);

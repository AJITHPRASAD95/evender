const { mongoose } = require('./common');
const schema = new mongoose.Schema({ shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true, index: true }, name: { type: String, required: true }, category: String, description: String, price: { type: Number, required: true, min: 0 }, offerPrice: { type: Number, min: 0 }, stockQuantity: { type: Number, default: 0, min: 0 }, unit: { type: String, enum: ['kg','g','piece','packet','litre'], required: true }, images: [String], isAvailable: { type: Boolean, default: true } }, { timestamps: true });
schema.index({ shopId: 1, name: 1 });
module.exports = mongoose.model('Product', schema);

const { mongoose } = require('./common');
const schema = new mongoose.Schema({ shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true, index: true }, subOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubOrder', required: true, unique: true }, grossAmount: Number, commissionAmount: Number, deductions: { type: Number, default: 0 }, payableAmount: Number, settlementStatus: { type: String, enum: ['pending','processed','failed'], default: 'pending' }, settledAt: Date }, { timestamps: true });
module.exports = mongoose.model('VendorSettlement', schema);

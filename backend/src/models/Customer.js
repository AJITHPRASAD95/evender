const { mongoose, locationSchema, addressSchema } = require('./common');
const schema = new mongoose.Schema({ name: { type: String, required: true }, phone: { type: String, required: true, unique: true }, email: { type: String, lowercase: true, sparse: true, unique: true }, passwordHash: { type: String, required: true, select: false }, addresses: [addressSchema], defaultLocation: locationSchema, fcmToken: String, role: { type: String, default: 'customer', immutable: true } }, { timestamps: true });
module.exports = mongoose.model('Customer', schema);

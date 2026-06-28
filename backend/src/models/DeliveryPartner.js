const { mongoose, locationSchema } = require('./common');
const schema = new mongoose.Schema({ name: { type: String, required: true }, phone: { type: String, required: true, unique: true }, passwordHash: { type: String, required: true, select: false }, vehicleType: String, currentLocation: locationSchema, isOnline: { type: Boolean, default: false }, assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubOrder' }], fcmToken: String, role: { type: String, default: 'delivery', immutable: true } }, { timestamps: true });
module.exports = mongoose.model('DeliveryPartner', schema);

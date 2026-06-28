const DeliveryPartner = require('../models/DeliveryPartner');
async function assign(subOrder) { const rider = await DeliveryPartner.findOne({ isOnline: true }).sort({ updatedAt: 1 }); if (!rider) return null; subOrder.assignedDeliveryPartnerId = rider._id; await subOrder.save(); await DeliveryPartner.updateOne({ _id: rider._id }, { $addToSet: { assignedOrders: subOrder._id } }); return rider; }
module.exports = { assign };

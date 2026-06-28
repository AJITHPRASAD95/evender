const VendorSettlement = require('../models/VendorSettlement');
async function createSettlement(subOrder, session) { return VendorSettlement.findOneAndUpdate({ subOrderId: subOrder._id }, { $setOnInsert: { shopId: subOrder.shopId, grossAmount: subOrder.subtotal, commissionAmount: subOrder.commissionAmount, payableAmount: subOrder.vendorPayableAmount } }, { upsert: true, new: true, session }); }
module.exports = { createSettlement };

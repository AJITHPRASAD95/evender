const SubOrder = require('../models/SubOrder');
const { round } = require('./pricingService');
async function splitOrder(masterOrder, groups, session) {
  const docs = groups.map(({ shop, items, subtotal }) => { const commissionAmount = round(subtotal * shop.commissionPercentage / 100); return { masterOrderId: masterOrder._id, shopId: shop._id, items, subtotal: round(subtotal), commissionAmount, vendorPayableAmount: round(subtotal - commissionAmount) }; });
  return SubOrder.insertMany(docs, { session });
}
module.exports = { splitOrder };

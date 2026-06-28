const crypto = require('crypto');
const { getRazorpay } = require('../config/razorpay');
async function createRazorpayOrder(amount, receipt) { return getRazorpay().orders.create({ amount: Math.round(amount * 100), currency: 'INR', receipt }); }
function verifySignature(orderId, paymentId, signature) { const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex'); return expected.length === String(signature || '').length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(signature || ''))); }
module.exports = { createRazorpayOrder, verifySignature };

const Razorpay = require('razorpay');
let client;
function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) throw Object.assign(new Error('Razorpay is not configured'), { status: 503 });
  client ||= new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
  return client;
}
module.exports = { getRazorpay };

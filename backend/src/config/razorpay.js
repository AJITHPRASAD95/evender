const Razorpay = require('razorpay');
let client;
function getRazorpay() {
  const keyId=process.env.RAZORPAY_KEY_ID||process.env.key_id;
  const keySecret=process.env.RAZORPAY_KEY_SECRET||process.env.key_secret;
  if (!keyId || !keySecret) throw Object.assign(new Error('Razorpay is not configured'), { status: 503 });
  client ||= new Razorpay({ key_id: keyId, key_secret: keySecret });
  return client;
}
module.exports = { getRazorpay };

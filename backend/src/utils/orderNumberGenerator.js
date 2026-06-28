const crypto = require('crypto');
function orderNumber() { return `HL${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(2).toString('hex').toUpperCase()}`; }
module.exports = { orderNumber };

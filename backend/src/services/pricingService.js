const { distanceKm } = require('../utils/distanceCalculator');
const n = (key, fallback) => Number(process.env[key] ?? fallback);
function calculatePricing(groups, deliveryLocation) {
  const subtotal = groups.reduce((sum, group) => sum + group.subtotal, 0);
  const maxDistance = Math.max(0, ...groups.map(group => distanceKm(group.shop.location, deliveryLocation)));
  const deliveryFee = n('BASE_DELIVERY_FEE', 30) + Math.max(0, groups.length - 1) * n('EXTRA_SHOP_PICKUP_FEE', 10) + Math.max(0, maxDistance - n('FREE_DISTANCE_KM', 2)) * n('DISTANCE_FEE_PER_KM', 8);
  const platformFee = n('PLATFORM_FEE', 5), discount = 0;
  return { subtotal: round(subtotal), deliveryFee: round(deliveryFee), platformFee: round(platformFee), discount, grandTotal: round(subtotal + deliveryFee + platformFee - discount), distanceKm: round(maxDistance) };
}
const round = value => Math.round((value + Number.EPSILON) * 100) / 100;
module.exports = { calculatePricing, round };

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const { distanceKm } = require('../utils/distanceCalculator');
const { calculatePricing } = require('./pricingService');
async function getPopulatedCart(customerId) { return Cart.findOne({ customerId }).populate('items.productId').populate('items.shopId'); }
async function validateCart(customerId, deliveryLocation) {
  const cart = await getPopulatedCart(customerId);
  if (!cart?.items.length) throw bad('Cart is empty');
  const location = deliveryLocation || cart.deliveryLocation;
  if (!location) throw bad('Delivery location is required');
  const groupsByShop = new Map();
  for (const item of cart.items) {
    const product = item.productId, shop = item.shopId;
    if (!product || !product.isAvailable || product.stockQuantity < item.quantity) throw bad(`${product?.name || 'Product'} is unavailable in requested quantity`);
    if (!shop || !shop.isOpen || shop.status !== 'approved') throw bad(`${shop?.shopName || 'Shop'} is not accepting orders`);
    if (distanceKm(shop.location, location) > shop.deliveryRadiusKm) throw bad(`${shop.shopName} does not deliver to this location`);
    const price = product.offerPrice != null ? product.offerPrice : product.price;
    const key = String(shop._id);
    if (!groupsByShop.has(key)) groupsByShop.set(key, { shop, items: [], subtotal: 0 });
    const group = groupsByShop.get(key), lineTotal = price * item.quantity;
    group.items.push({ productId: product._id, name: product.name, unit: product.unit, quantity: item.quantity, priceAtOrderTime: price, lineTotal });
    group.subtotal += lineTotal;
  }
  const groups = [...groupsByShop.values()];
  for (const group of groups) if (group.subtotal < group.shop.minimumOrderValue) throw bad(`${group.shop.shopName} requires a minimum order of ₹${group.shop.minimumOrderValue}`);
  return { cart, groups, deliveryLocation: location, pricing: calculatePricing(groups, location) };
}
const bad = message => Object.assign(new Error(message), { status: 400 });
module.exports = { getPopulatedCart, validateCart };

const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({ latitude: { type: Number, required: true }, longitude: { type: Number, required: true } }, { _id: false });
const addressSchema = new mongoose.Schema({ label: String, line1: String, line2: String, city: String, pincode: String, location: locationSchema }, { timestamps: true });
const orderItemSchema = new mongoose.Schema({ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, name: String, quantity: { type: Number, min: 1 }, unit: String, priceAtOrderTime: { type: Number, min: 0 }, lineTotal: { type: Number, min: 0 } }, { _id: false });
module.exports = { mongoose, locationSchema, addressSchema, orderItemSchema };

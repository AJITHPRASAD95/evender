const MasterOrder = require('../models/MasterOrder'); const { ok } = require('../utils/responseHandler');
async function getOne(req,res,next){try{const order=await MasterOrder.findOne({_id:req.params.masterOrderId,customerId:req.user.id}).populate({path:'subOrderIds',populate:{path:'shopId',select:'shopName shopType address'}});if(!order)throw Object.assign(new Error('Order not found'),{status:404});ok(res,order);}catch(e){next(e)}}
async function myOrders(req,res,next){try{ok(res,await MasterOrder.find({customerId:req.user.id}).sort({createdAt:-1}).populate('subOrderIds'));}catch(e){next(e)}}
module.exports={getOne,myOrders};

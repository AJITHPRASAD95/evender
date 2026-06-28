const Shop=require('../models/Shop');const MasterOrder=require('../models/MasterOrder');const VendorSettlement=require('../models/VendorSettlement');const DeliveryPartner=require('../models/DeliveryPartner');const Product=require('../models/Product');const {ok}=require('../utils/responseHandler');
const orders=async(_q,r,n)=>{try{ok(r,await MasterOrder.find().sort({createdAt:-1}).populate('customerId','name phone').populate('subOrderIds'));}catch(e){n(e)}};
const shops=async(_q,r,n)=>{try{ok(r,await Shop.find().sort({createdAt:-1}));}catch(e){n(e)}};
async function shopStatus(req,res,next){try{const s=await Shop.findByIdAndUpdate(req.params.shopId,{status:req.body.status},{new:true,runValidators:true});ok(res,s);}catch(e){next(e)}}
async function commission(req,res,next){try{const s=await Shop.findByIdAndUpdate(req.params.shopId,{commissionPercentage:req.body.commissionPercentage},{new:true,runValidators:true});ok(res,s);}catch(e){next(e)}}
const settlements=async(_q,r,n)=>{try{ok(r,await VendorSettlement.find().populate('shopId','shopName').populate('subOrderId'));}catch(e){n(e)}};
async function processSettlements(req,res,next){try{const ids=req.body.settlementIds||[];const result=await VendorSettlement.updateMany({_id:{$in:ids},settlementStatus:'pending'},{$set:{settlementStatus:'processed',settledAt:new Date()}});ok(res,result,'Settlements processed');}catch(e){next(e)}}
const deliveryPartners=async(_q,r,n)=>{try{ok(r,await DeliveryPartner.find().select('-passwordHash'));}catch(e){n(e)}};
const products=async(_q,r,n)=>{try{ok(r,await Product.find().populate('shopId','shopName'));}catch(e){n(e)}};
module.exports={orders,shops,shopStatus,commission,settlements,processSettlements,deliveryPartners,products};

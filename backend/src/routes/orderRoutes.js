const router=require('express').Router();const c=require('../controllers/orderController');router.get('/my-orders',c.myOrders);router.get('/:masterOrderId',c.getOne);module.exports=router;

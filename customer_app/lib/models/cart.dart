class CartItem{CartItem({required this.productId,required this.shopId,required this.name,required this.quantity,required this.price});final String productId,shopId,name;final int quantity;final double price;}
class ShopCart{ShopCart(this.shopId,this.shopName,this.items);final String shopId,shopName;final List<CartItem> items;double get subtotal=>items.fold(0,(s,i)=>s+i.price*i.quantity);}

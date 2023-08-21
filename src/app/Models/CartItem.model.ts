export class CartItem {
  public product_id: number;
  public order_products_id: number;
  public quantity: number;
  public order_id: number;
  public name: string;
  public price: number | string;
  public category: string;
  public img_url: string;
  public description: string;

  constructor(
    product_id: number,
    order_products_id: number,
    quantity: number,
    order_id: number,
    name: string,
    price: number | string,
    category: string,
    img_url: string,
    description: string
  ) {
    this.product_id = product_id;
    this.order_products_id = order_products_id;
    this.quantity = quantity;
    this.order_id = order_id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.img_url = img_url;
    this.description = description;
  }
}
export interface Cart {
  product_id: number;
  order_products_id: number;
  quantity: number;
  order_id: number;
  name: string;
  price: string;
  category: string;
  img_url: string;
  description: string;
}
export interface OrderProductResponse {
  status: string;
  result?: number;
  data: {
    order: OrderProduct;
    orders: Cart[];
  };
}
export interface OrderResponse {
  data: {
    order: Order[];
  };
  status: string;
}
export interface Order {
  order_id: number;
  status: string;
  user_id: number;
}
export interface OrderProduct {
  order_products_id: number;
  quantity: number;
  product_id: number;
  order_id: number;
}

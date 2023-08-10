export class Product {
  public product_id: number;
  public name: string;
  public price: number;
  public category: string;
  public img_url: string;
  public description: string;

  constructor(
    product_id: number,
    name: string,
    price: number,
    category: string,
    img_url: string,
    description: string
  ) {
    this.product_id = product_id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.img_url = img_url;
    this.description = description;
  }
}

export class ProductsResult {
  public status: string;
  public results: number;
  public data: { products: Product[] };

  constructor(status: string, results: number, data: { products: Product[] }) {
    this.status = status;
    this.results = results;
    this.data = data;
  }
}
export class ProductResult {
  public status: string;
  public results: number;
  public data: { product: Product };

  constructor(status: string, results: number, data: { product: Product }) {
    this.status = status;
    this.results = results;
    this.data = data;
  }
}

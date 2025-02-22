export interface BaseApiResponse<U = any, T = any> {
  status: string;
  code: string;
  message: string;
  details: T;
  detail: U;
}

export interface BaseProductDetails<T=any>{
  totalProducts:number;
  products:T[];
}

export interface ProductDetails{
    productId:number;
    name:string;
    description:string;
    price:number;
    brand:string;
    category:string;
    releaseDate:string;
    available:boolean;
    quantity:number;
}

export interface ProductDetailsResponse extends BaseApiResponse<never,BaseProductDetails<ProductDetails>>{}

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductDetails, ProductDetailsResponse } from '../api-response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private apiservice : ApiService) { }

  //Get All Products
  getProductDetails(){
    return this.apiservice.get<ProductDetailsResponse>('api/products');
  }

  //Get Product By Id
  getProductById(productId : number){
    return this.apiservice.get<ProductDetailsResponse>('api/products/' + productId) ;
  }

  //Add Product
  // addProducts(
  //   addProduct : FormData,
  //   headers : HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data',
  //     Accept: 'application/json',
  //   })
  // ): Observable<HttpResponse<ProductDetailsResponse>> {
  //   return this.apiservice.post('api/add-product', addProduct,undefined,headers);
  // }
  addProducts(formData: FormData): Observable<HttpResponse<ProductDetailsResponse>> {
    return this.apiservice.postMultipart('api/add-product', formData);
  }

  //Delete Product
  deleteProduct(productId: number): Observable<HttpResponse<any>> {
    return this.apiservice.post(`api/delete/products/${productId}`);
  }

  // Edit Product
editProduct(
  updatedProduct: ProductDetails
): Observable<HttpResponse<ProductDetailsResponse>> {
  return this.apiservice.post(`api/update/product`, updatedProduct);
}
}

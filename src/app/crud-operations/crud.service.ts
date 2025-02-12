import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductDetails, ProductDetailsResponse } from '../api-response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private apiservice : ApiService) { }

  getProductDetails(){
    return this.apiservice.get<ProductDetailsResponse>('api/products');
  }

  getProductById(productId : number){
    return this.apiservice.get<ProductDetailsResponse>('api/products/' + productId) ;
  }

  addProducts(
    addProduct : ProductDetails
  ): Observable<HttpResponse<ProductDetailsResponse>> {
    return this.apiservice.post('api/add-product', addProduct);
  }

  deleteProduct(productId : number){
    return this.apiservice.post('api/delete/products/' + productId);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductDetailsResponse } from '../api-response';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private apiservice : ApiService) { }

  getProductDetails(){
    return this.apiservice.get<ProductDetailsResponse>('api/products');
  }

  getProductById(){
    return this.apiservice.get<ProductDetailsResponse>('api/products');
  }

}

import { ApiService } from './../api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud-operations/crud.service';
import { ProductDetails,ProductDetailsResponse,BaseApiResponse } from '../api-response';

@Component({
  selector: 'app-list-product',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent {

  productList : ProductDetails[] | any;

   constructor( private _crudService: CrudService ) { console.log('ListProductComponent constructor called');}

  products = [
    {
      name: 'Product 1',
      description: 'This is a description for product 1.',
      price: 25.99,
      image: 'https://via.placeholder.com/250'
    },
    {
      name: 'Product 2',
      description: 'This is a description for product 2.',
      price: 35.99,
      image: 'https://via.placeholder.com/250'
    },
    {
      name: 'Product 3',
      description: 'This is a description for product 3.',
      price: 19.99,
      image: 'https://via.placeholder.com/250'
    }
    // Add more products as needed
  ];


  ngOnInit(): void {
    console.log("Grish Shrestha")
    this.getProduct();
  }

  getProduct(){
    console.log("ranjan")
    this._crudService.getProductDetails().subscribe((res)=>{
      if(res.ok){
        this.productList = res.body?.details?.products;
      }
    })
   // this._apiService.get<ProductDetailsResponse>('api/products');
  }
}

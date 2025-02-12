import { ApiService } from './../api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud-operations/crud.service';
import { ProductDetails,ProductDetailsResponse,BaseApiResponse } from '../api-response';
import { response } from 'express';

@Component({
  selector: 'app-list-product',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {

  productList : ProductDetails[] | any;

   constructor( private _crudService: CrudService ) { console.log('ListProductComponent constructor called');
   }

  ngOnInit(): void {
    console.log("Grish Shrestha")
    this.getProduct();
  }

  getProduct(){
    console.log("ranjan")
    this._crudService.getProductDetails().subscribe((res)=>{
      if(res.ok){
        this.productList = res.body?.details?.products;
        console.log(this.productList);
      }else{
        console.log("Error OCcurs")
      }
    })
  }

  deleteProduct(productId : number){
    try{
    this._crudService.deleteProduct(productId).subscribe((response)=>{
      if(response.ok){
        alert("Succesfully Deleted Product");
          window.location.reload();
      }else{
        alert("Failed To Delete Product");
      }
    })
  }catch(err){
    console.log(err);
  }
  }
}

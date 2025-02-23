import { ApiService } from './../api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud-operations/crud.service';
import { ProductDetails, ProductDetailsResponse, BaseApiResponse, BaseProductDetails } from '../api-response';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {

  productList: ProductDetails[] | any;
  totalProduct : BaseProductDetails | any;
  productId : number | any;

  constructor(private _crudService: CrudService,
              private router: Router) {
    console.log('ListProductComponent constructor called');
  }

  ngOnInit(): void {
    console.log("Grish Shrestha")
    this.getProduct();
    this.getProductImage();
  }

  getProduct(): void {
    console.log("ranjan")
    this._crudService.getProductDetails().subscribe((res) => {
      if (res.ok) {
        this.productList = res.body?.details?.products;
        this.totalProduct = res.body?.details.totalProducts;

        this.productList.forEach((product: ProductDetails) => {
          this.loadProductImage(product.productId);
        });
      } else {
        console.log("Error occurs");
      }
    });
  }

  deleteProduct(productId: number): void {
    try {
      this._crudService.deleteProduct(productId).subscribe((response) => {
        if (response.ok) {
          alert("Successfully Deleted Product");
          window.location.reload();
        } else {
          alert("Failed To Delete Product");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

   editProduct(productId: number): void {
    this.router.navigate(['/home/update-product', productId]);
  }

  getProductById(productId : any) : void {
    this._crudService.getProductById(productId).subscribe((response)=>{
      if(response.ok){
        const product = response.body?.details.products;
        console.log(product);
      }else{
        console.log('Error Occurs');
      }
    })
  }

  getProductImage() : void {
    if(this.productId){
    this._crudService.getProductImage(this.productId).subscribe((response)=>{
      if(response.ok){
        console.log(response);
      }else{
        console.log('Error Occurs');
      }
    })
  }
 }
 private loadProductImage(productId: number): void {
  this._crudService.getProductImage(productId).subscribe({
    next: (response) => {
      if (response.ok && response.body) {
        const blob = response.body;
        const imageUrl = URL.createObjectURL(blob);

        // Update the correct product in the list
        this.productList = this.productList.map((p: ProductDetails) => {
          if (p.productId === productId) {
            return { ...p, image: imageUrl };
          }
          return p;
        });
      }
    },
    error: (err) => {
      console.error('Error loading image:', err);
      // Optionally set a default image
      // product.image = 'assets/default-image.png';
    }
  });
}
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud-operations/crud.service';
import { ProductDetails, BaseProductDetails } from '../api-response';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

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
  productImages: { [key: number]: string } = {};
  baseUrl = environment.baseUrl;
  productImage : any;

  constructor(private _crudService: CrudService,
              private router: Router) {
    console.log('ListProductComponent constructor called');
  }

  ngOnInit(): void {
    console.log("Grish Shrestha")
    this.getProduct();
  }

  getProduct(): void {
    this._crudService.getProductDetails().subscribe((res) => {
      if (res.ok) {
        this.productList = res.body?.details?.products;
        this.totalProduct = res.body?.details.totalProducts;
       this.productList.forEach((product: ProductDetails) => {
        this.getProductImage(product.productId);
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

  getProductImage(productId: number): void {
    this._crudService.getProductImage(productId).subscribe((response) => {
      if (response.ok) {
        // Store each product's image in a dictionary using productId as key
        this.productImages[productId] = `${this.baseUrl}/api/product/${productId}/image`;
      } else {
        console.log('Error Occurs');
      }
    });
  }
}

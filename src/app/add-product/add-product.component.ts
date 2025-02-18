import { Router } from '@angular/router';
import { ProductDetails } from './../api-response';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../crud-operations/crud.service';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})

export class AddProductComponent {
  productDetail : ProductDetails = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    brand: '',
    category: '',
    releaseDate: '',
    available: false,
    quantity: 0,
  };

  constructor(private crudService : CrudService,
    private router : Router
  ){}

  addProduct() {
    if(this.productDetail){
      this.crudService.addProducts(this.productDetail).subscribe((res)=>{
        if(res.ok){
          alert("Added Product Successfully")
          this.router.navigate(['home/list-product']);
        }else{
          alert("Failed To Add Product");
        }
      })
    }
  }
}

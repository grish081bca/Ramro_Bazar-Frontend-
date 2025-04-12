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
    productName: '',
    description: '',
    price: 0,
    brand: '',
    category: '',
    releaseDate: '',
    available: false,
    quantity: 0,
    imageUrl: ''
  };
  selectedFile: File | null = null;

  constructor(private crudService : CrudService,
    private router : Router
  ){}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.match(/image\/*/)) {
      this.selectedFile = file;
    } else {
      alert('Only image files are allowed');
    }
  }

  // addProduct() {
  //   if(this.productDetail){
  //     this.crudService.addProducts(this.productDetail).subscribe((res)=>{
  //       if(res.ok){
  //         alert("Added Product Successfully")
  //         this.router.navigate(['home/list-product']);
  //       }else{
  //         alert("Failed To Add Product");
  //       }
  //     })
  //   }
  // }

  addProduct() {
    if (!this.selectedFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();

    formData.append('productName', this.productDetail.productName);
    formData.append('description', this.productDetail.description);
    formData.append('price', this.productDetail.price.toString());
    formData.append('brand', this.productDetail.brand);
    formData.append('category', this.productDetail.category);
    formData.append('releaseDate', this.productDetail.releaseDate);
    formData.append('available', this.productDetail.available.toString());
    formData.append('quantity', this.productDetail.quantity.toString());
    formData.append('imageFile', this.selectedFile);

    // 3. Send without any headers
    this.crudService.addProducts(formData).subscribe({
      next: (res) => {
        if (res.ok) this.router.navigate(['home/list-product']);
      },
      error: (err) => {
        console.error('Upload error:', err);
        alert('Error adding product');
      }
    });
  }
}


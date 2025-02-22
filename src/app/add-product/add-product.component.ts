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

    // 1. Create JSON part with explicit content type
    const productBlob = new Blob([JSON.stringify(this.productDetail)], {
      type: 'application/json'
    });

    // 2. Append parts with exact backend parameter names
    formData.append('productDTO', productBlob);
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


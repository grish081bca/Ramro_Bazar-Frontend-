import { ProductDetails } from './../api-response';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud-operations/crud.service';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  productDetail : ProductDetails[] | any;
  selectedFile: File | null = null;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //This will take the Id from Url
    this.route.paramMap.subscribe(params=>{
      const productId = params.get('id');
      if(productId){
        console.log('Details Fetch SuccessFully');
        this.getDetailsFromId(productId);
      }else{
        console.log('Error Occurs While Fechting Data from ID');
      }
    });
  }

  //This will get the all details of that product from Id that have been passed in navigation
  getDetailsFromId(productId : any){
    this.crudService.getProductById(productId).subscribe((response)=>{
      if(response.ok){
        this.productDetail = response.body?.details.products;
        console.log(this.productDetail);
      }else{
        alert('Something went wrong please try again');
      }
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.match(/image\/*/)) {
      this.selectedFile = file;
    } else {
      alert('Only image files are allowed');
    }
  }

  updateProductDetail() {
    const formData = new FormData();
    formData.append('productId', this.productDetail.productId);
    formData.append('productName', this.productDetail.productName);
    formData.append('description', this.productDetail.description);
    formData.append('price', this.productDetail.price.toString());
    formData.append('brand', this.productDetail.brand);
    formData.append('category', this.productDetail.category);
    formData.append('releaseDate', this.productDetail.releaseDate);
    formData.append('available', this.productDetail.available.toString());
    formData.append('quantity', this.productDetail.quantity.toString());

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    this.crudService.editProduct(formData).subscribe((res) => {
      if (res.ok) {
        alert('Product Updated Successfully');
        this.router.navigate(['/home/list-product']);
      } else {
        alert('Failed To Update Product');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/home/list-product']);
  }
}

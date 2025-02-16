import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from '../api-response';
import { CrudService } from '../crud-operations/crud.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule here
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  productDetail: ProductDetails[] | any;

  // productDetail : ProductDetails[]  | any;

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['productDetails']) {
      this.productDetail = state['productDetails'];
    } else {
      // Retrieve productId from the URL if state is missing (due to refresh)
      const productId = Number(this.route.snapshot.paramMap.get('id'));
      if (productId) {
        this.getProductById(productId);
      } else {
        console.error('Product details are missing and no productId in URL.');
      }
    }
  }
  getProductById(productId: number) {
    this.crudService.getProductById(productId).subscribe((response) => {
      const productData = response.body?.details.products;

      if (Array.isArray(productData)) {
        this.productDetail = productData.length > 0 ? productData[0] : this.productDetail;
      } else if (productData) {
        this.productDetail = productData;
      } else {
        console.error('No product found for the given ID');
      }
      this.cdr.detectChanges();  // ✅ Trigger update
    });
  }


  updateProduct(): void {
    this.crudService.updateProduct(this.productDetail.productId, this.productDetail).subscribe(
      response => {
        if (response.ok) {
          alert('Product updated successfully!');
          this.router.navigate(['/home/list-product']);  // Navigate back to product list
        } else {
          alert('Failed to update product.');
        }
      },
      err => {
        console.error('Error updating product:', err);
        alert('An error occurred while updating the product.');
      }
    );
  }
}

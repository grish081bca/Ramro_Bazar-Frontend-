import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from '../api-response';
import { CrudService } from '../crud-operations/crud.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  updateForm: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      category: [''],
      quantity: ['', Validators.required],
      brand: [''],
      available: [true],
      releaseDate: ['']
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Product ID received:", this.productId);
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    this.crudService.getProductById(this.productId).subscribe({
      next: (response) => {
        if (response.ok && response.body?.details?.products) {
          const product = response.body?.details?.products?.[0];
          this.updateForm.patchValue({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            brand: product.brand,
            available: product.available,
            releaseDate: product.releaseDate
          });
        } else {
          if (typeof window !== 'undefined') {
            alert('Failed to load product details');
          }
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        alert('Error loading product details');
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedProduct: ProductDetails = this.updateForm.value;
      this.crudService.updateProduct(this.productId, updatedProduct).subscribe({
        next: (response) => {
          if (response.ok && response.body?.details) {
            alert('Product updated successfully');
            this.router.navigate(['/products']);
          } else {
            alert(response.body?.message || 'Failed to update product');
          }
        },
        error: (error) => {
          console.error('Error updating product:', error);
          alert('Error updating product');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}

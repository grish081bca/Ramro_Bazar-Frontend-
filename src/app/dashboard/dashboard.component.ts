import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud-operations/crud.service';
import { ProductDetails } from '../api-response';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  productsList: ProductDetails[]  | any;
  categories: any;  // Changed this to an array
  filteredProducts: ProductDetails[] = []; // Initialize with an empty array

  cartItemCount = 0;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.listProducts(); // Fetch products when the component is initialized
  }

  addToCart(product: any) {
    this.cartItemCount++;
  }

  filterProducts(event: any) {
    const selectedCategory = event.target.value;
    this.filteredProducts = selectedCategory
      ? this.productsList.filter((p: { category: any; }) => p.category === selectedCategory)
      : [...this.productsList];
  }

  listProducts() {
    this.crudService.getProductDetails().subscribe((response) => {
      if (response.ok) {
        this.productsList = response.body?.details.products;
        // Assuming categories are part of the response structure
        this.categories = [...new Set(this.productsList.map((p: { category: any; }) => p.category))]; // Extract unique categories
        this.filteredProducts = [...this.productsList]; // Initialize filtered products after loading data
      } else {
        console.log("Error Occurred");
      }
    });
  }
}

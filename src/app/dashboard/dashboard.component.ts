import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cartItemCount = 0;
  categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'];

  products = [
    { id: 1, name: 'Laptop', price: 799, category: 'Electronics', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'T-Shirt', price: 20, category: 'Clothing', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Cookware Set', price: 50, category: 'Home & Kitchen', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Book: Angular Basics', price: 15, category: 'Books', image: 'https://via.placeholder.com/150' },
  ];

  filteredProducts = [...this.products];

  addToCart(product: any) {
    this.cartItemCount++;
  }

  filterProducts(event: any) {
    const selectedCategory = event.target.value;
    this.filteredProducts = selectedCategory
      ? this.products.filter(p => p.category === selectedCategory)
      : [...this.products];
  }
}

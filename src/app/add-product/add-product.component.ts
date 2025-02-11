import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<any>();

  newProduct = { name: '', price: null, category: '', image: '' };

  addProduct() {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.category && this.newProduct.image) {
      this.productAdded.emit(this.newProduct);
      this.newProduct = { name: '', price: null, category: '', image: '' };
    } else {
      alert('Please fill all fields');
    }
  }
}

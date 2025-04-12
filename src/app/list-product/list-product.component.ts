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
  baseUrl = environment.baseUrl;

  constructor(private _crudService: CrudService,
              private router: Router) {
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
}

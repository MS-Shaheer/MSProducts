import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: any

  constructor(private router: Router, private productService: ProductsService) {
    this.productService.fetchProducts()
    .subscribe((data: any) => {
      this.products = data.Products
    })
  }

  deleteProduct(prodId: any):void {
    this.productService.deleteProduct(prodId)
    .subscribe(data => {
    //   this.products = this.products.filter((u: any) => {
    //     u !== prodId
    //   })
    // })

    // this.router.navigate(['list-products'])

    setTimeout(() => {
      this.productService.fetchProducts()
      .subscribe((data: any) => {
        this.products = data.Products
      });
    }, 1000)
  })
  }
  ngOnInit(): void {

  }

}

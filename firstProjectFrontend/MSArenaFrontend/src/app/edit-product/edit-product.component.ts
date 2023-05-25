import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products } from '../products.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  ngForm: FormGroup
  product: any
  error: any
  subscription: Subscription
  id: any;
  products: any;
  success: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private productService: ProductsService) {
    
    this.ngForm = this.fb.group(
      {
        id: [''],
        name: ['', Validators.required],
        description: [''],
        price: ['', Validators.required],
        company: ['', Validators.required],
        year_released: ['', Validators.required],
        discontinued: [''],
      }
    );

    this.subscription = this.route.paramMap
    .subscribe(params => {
      this.id = params.get('id')
    })
  }

  ngOnInit() {
    this.getSingleProduct(this.id)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  getSingleProduct(id) {
    this.productService.getProductId(id)
    .subscribe((res: any) => {
      this.product = res
      this.ngForm.patchValue(this.product)
    },
    (err) => {
      this.error = err
    })
  }

  UpdateProduct(form: any) {
    this.productService.updateProduct(form.value)
    .subscribe((res: any) => {
      this.product = res
      // this.success = "Product Updated."
      this.router.navigate([''])

      // form.reset()
    },
    (err: any) => {
      this.error = err
    })
  }
}

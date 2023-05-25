import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  ngForm: FormGroup


  constructor(private fb: FormBuilder, private router: Router, private productService: ProductsService) {
    
    this.ngForm = this.fb.group(
      {
        name: ['name', Validators.required],
        description: ['description'],
        price: ['price', Validators.required],
        company: ['company', Validators.required],
        year_released: ['year_released', Validators.required],
        discontinued: ['discontinued'],
      }
    );
  }

  ngOnInit() {

  }

  AddProduct(form: any) {
    this.productService.addProduct(
      this.ngForm.value.name,
      this.ngForm.value.description,
      this.ngForm.value.price,
      this.ngForm.value.company,
      this.ngForm.value.year_released,
      this.ngForm.value.discontinued
    )
    .pipe(first())
    .subscribe((data) => {
      this.router.navigate([''])
    },
    error => {
      console.log("Error in adding product.")
    })
    // console.log(this.ngForm.value);
  }


}

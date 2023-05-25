import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Products } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL: string = 'http://127.0.0.1:5000/'

  addProduct(name:any, description:any, price:any, company:any, year_released:any, discontinued:any) {
    return this.http.post<Products>(this.baseURL + 'products',{name, description, price, company, year_released, discontinued})
    .pipe(map((Products):any => {
      return Products
    }))
  }

  fetchProducts() {
    return this.http.get<Products[]>(this.baseURL + 'products')
  }

  deleteProduct(id: any) {
    // const params = new HttpParams().set('id', id)
    return this.http.delete(this.baseURL + 'product/'+id)
  }

  getProductId(id: any) {
    return this.http.get<Products>(this.baseURL + 'product/'+id)
  }

  updateProduct(products: any) {
    return this.http.put<Products>(this.baseURL + 'product/' +products.id, products)
  }

  constructor(private http: HttpClient) {
    
  }
}

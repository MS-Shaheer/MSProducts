import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddProductsComponent } from "./add-products/add-products.component";
import { ListProductsComponent } from "./list-products/list-products.component";
import { EditProductComponent } from "./edit-product/edit-product.component";

const routes: Routes = [
    {path: 'add-product', component: AddProductsComponent},
    {path: '', component: ListProductsComponent},
    {path: 'edit/:id', component: EditProductComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}


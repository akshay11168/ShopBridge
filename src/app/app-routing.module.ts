import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  {path: 'products', component:ProductsComponent},
  {path: 'productslist', component:ProductListComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: '', component:ProductListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

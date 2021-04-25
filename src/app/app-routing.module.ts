import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './components/products/products.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';


const routes: Routes = [
  // {path: '', component:SideNavbarComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'productslist', component:ProductListComponent},
  {path: 'sidenav', component:SideNavbarComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: '', component:ProductListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  public productName: string;
  public title: string = "Shop Bridge"

  constructor(private _productService: ProductsService,private router : Router) { }

  ngOnInit(): void {
  }

  // searching products based on product Name
  public searchProduct(){
    this.router.navigate(['/productslist'])
    this._productService.searchProduct(this.productName)
  }

  // sibling interaction toggle button
  public toggleSidenav()
  {
    this._productService.toggleSideNav(!this._productService.getToggleSideNavSource().value )
  }
}

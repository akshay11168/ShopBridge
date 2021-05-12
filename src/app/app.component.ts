import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ShopBridge';

  sideNavSatus:Boolean

  constructor(private _productService:ProductsService){}
  ngOnInit(){

    this._productService.getToggleSideNavData().subscribe((data: any) => {
      this.sideNavSatus = data
    })

  }


}

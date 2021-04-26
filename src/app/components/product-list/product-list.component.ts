import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsService } from 'src/app/services/products.service';
import { ProductListDataSource, ProductListItem } from './product-list-datasource';
import { environment } from '../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductListItem>;

  public dataSource;
  public filterVal : string;
  public detailData : object;
  public productsList : any[];
  public filterByName: string;


  // columns to be displayed in table in sequence as given
  displayedColumns = ['productId','productName', "stock", "price", "details", 'edit', "delete"];

  
  constructor(private _cd: ChangeDetectorRef, private _productService: ProductsService, private _snackBar: MatSnackBar, private _router: Router) {
  }

  ngOnInit() {

    // this function is used to populate filervalue from top nav bar then search accordingly
    this._productService.currentMessage.subscribe((productName) => {
      this.filterByName = productName
      this.getSpecificProduct()
      this.getAllProducts()
    })
  }


  ngAfterViewInit() {
  }

  // filter to filter data in table
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // used to get list of all products to be displayed in table
  public getAllProducts() {
    this._productService.getProducts(environment.urls.getAllProducts).subscribe((response) => {
      this.productsList = response
      this.dataSource = new MatTableDataSource(this.productsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;

      this._cd.detectChanges();

    }, error => {
      this._snackBar.open('some error occured', 'OK', {
        duration: 4000
      })
    })

  }

  // used to get specific product based on product name (top nav bar search call)
  public getSpecificProduct() {
    if (this.filterByName) {
      this._productService.getProduct(environment.urls.getproductByName, { 'productName': this.filterByName }).subscribe((response) => {
        var result = JSON.parse(response)
        this.dataSource = new MatTableDataSource(result);
        this.table.dataSource = this.dataSource;
        this._cd.detectChanges();
      },
        error => {
          this._snackBar.open('some error occured', 'OK', {
            duration: 4000
          })
        })
    } else {
      this.getAllProducts()
    }



  }


  // used to delete product from backend based on product id
  public deleteProduct(id: string) {

    let snackbarAction = this._snackBar.open("You sure want to delete the Product", "Yes", {
      duration: 4000
    })

    var data = {
      '_id': id
    }

    snackbarAction.onAction().subscribe((response) => {
      this._productService.deleteProduct(environment.urls.deleteProduct, data).subscribe((response) => {
        this.getAllProducts()
        let snackbarAction = this._snackBar.open("Product deleted succesfully", "Ok", {
          duration: 4000
        })
      },
        error => {
          let snackbarAction = this._snackBar.open("Problem deleting the product", "Ok", {
            duration: 4000
          })
        })
    })
  }

  // send specific product to edit (productsComponent)
  public editProduct(data) {
    localStorage.setItem('mode', 'edit')

    this._router.navigate(['/products'])

    this._productService.editProduct(data)
  }

  // used to get details of a specific product
  detailProduct(id) {
    this._productService.getProduct(environment.urls.getProduct, { '_id': id }).subscribe((response) => {
      this.detailData = JSON.parse(response)
    },
      error => {
        this._snackBar.open('some error occured', 'OK', {
          duration: 4000
        })
      })
  }

}

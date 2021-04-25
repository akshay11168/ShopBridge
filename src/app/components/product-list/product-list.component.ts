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

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductListItem>;
  // dataSource: MatTableDataSource;
  public dataSource
  public filterVal
  public detailData
  productsList
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['productName', "stock", "price", "details", 'edit', "delete"];

  filterByName: string;
  constructor(private _cd: ChangeDetectorRef, private _productService: ProductsService, private _snackBar: MatSnackBar, private _router: Router) {
  }

  ngOnInit() {
    this._productService.currentMessage.subscribe((productName) => {
      this.filterByName = productName
      this.getSpecificProduct()
      this.getAllProducts()
    })
  }


  ngAfterViewInit() {
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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

  public getSpecificProduct() {
    if (this.filterByName) {
      this._productService.getProduct(environment.urls.getproductByName, { 'productName': this.filterByName }).subscribe((response) => {

        var result = JSON.parse(response)
        this.dataSource = new MatTableDataSource(result);
        this.table.dataSource = this.dataSource;
        this._cd.detectChanges();


        // this.detailData = JSON.parse(response)

        // if (this.detailData?.length >= 1) {
        //   this.getAllProducts()
        //   const filterValue = this.filterByName;
        //   this.dataSource.filter = filterValue.trim().toLowerCase();
        // }

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
        let snackbarAction = this._snackBar.open("Product deleted succesfully", "Yes", {
          duration: 4000
        })
      },
        error => {
          let snackbarAction = this._snackBar.open("Problem deleting the product", "Yes", {
            duration: 4000
          })
        })
    })
  }

  public editProduct(data) {
    localStorage.setItem('mode', 'edit')

    this._router.navigate(['/products'])

    this._productService.editProduct(data)
  }

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

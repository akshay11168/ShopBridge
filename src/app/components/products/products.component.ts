import { ChangeDetectorRef, Component, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products';
import { ProductsService } from 'src/app/services/products.service';
import { productIdValidator } from 'src/app/validators/validator';
import { environment } from 'src/environments/environment';

export declare const MAT_INPUT_VALUE_ACCESSOR: InjectionToken<{
  value: any;
}>;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild("stepper", { static: false }) stepper: MatStepper;
  currentMode = 'create'
  public fromGroup: FormGroup;
  public categoryList: string[] = ["mobile", "laptops"];
  public productId : string;
  public detailData : Product;


  constructor(private _formbuilder: FormBuilder, private cd: ChangeDetectorRef, private _productService: ProductsService,
    private _snackBar: MatSnackBar, private _router: Router) {
  }

  ngOnInit(): void {
    
    // creating form group and intializing as per create or edit mode
    this.fromGroup = this._formbuilder.group({
      productGroup: this._formbuilder.group({
        productName: ['', [Validators.required]],
        productId: ['', [Validators.required,productIdValidator]],
        productType: ['', [Validators.required]],
        description: ['', [Validators.required]],
      }),
      stockGroup: this._formbuilder.group({
        stock: ['', [Validators.required]],
        price: ['', [Validators.required]]
      })
    }); 

    if(localStorage.getItem('mode') && localStorage.getItem('mode')=='edit'){
    
      this.currentMode = localStorage.getItem('mode');

      localStorage.removeItem('mode')
      this._productService.editProductData.subscribe((data: any) => {
        if(data){
          this.fromGroup.controls['productGroup'].patchValue(data)
          this.fromGroup.controls['stockGroup'].patchValue(data)
          this.productId = data._id
        }
      })
    }
    
  }

  // used to create product and navigate to all products list page
  createProduct() {

    var productName = this.fromGroup.controls['productGroup'].value['productName']
    var productId = this.fromGroup.controls['productGroup'].value['productId']
    var productType = this.fromGroup.controls['productGroup'].value['productType']
    var description = this.fromGroup.controls['productGroup'].value['description']
    var stock = this.fromGroup.controls['stockGroup'].value['stock']
    var price = this.fromGroup.controls['stockGroup'].value['price']

    var product_data: Product = {
                    productName: productName,
                    productId: productId,
                    productType: productType,
                    description: description,
                    stock: stock,
                    price: price,
                  }

    // convert data to formData
    var formData = new FormData();
    Object.keys(product_data).forEach((key) => {
      formData.append(key, product_data[key])
    });

    this._productService.createProduct(environment.urls.createProduct, formData).subscribe((response: any) => {
      let snackbarAction = this._snackBar.open(response.message, "Yes", {
        duration: 4000
      })
      this._router.navigate(['/productslist'])
    }, (error) => {
      this._snackBar.open('some error occured', 'OK', {
        duration: 4000
      })
    })
  }

  // used to edit and update data in backend
  editProduct() {
    var productName = this.fromGroup.controls['productGroup'].value['productName']
    var productId = this.fromGroup.controls['productGroup'].value['productId']
    var productType = this.fromGroup.controls['productGroup'].value['productType']
    var description = this.fromGroup.controls['productGroup'].value['description']
    var stock = this.fromGroup.controls['stockGroup'].value['stock']
    var price = this.fromGroup.controls['stockGroup'].value['price']

    var product_data = {
      _id : this.productId,
      productName: productName,
      productId: productId,
      productType: productType,
      description: description,
      stock: stock,
      price: price,
    }

    var formData = new FormData();
    Object.keys(product_data).forEach((key) => {
      formData.append(key, product_data[key])
    });

    this._productService.updateProduct(environment.urls.updateProduct, formData).subscribe((response: any) => {
      let snackbarAction = this._snackBar.open(response.message, "Ok", {
        duration: 4000
      })

      this._router.navigate(['/productslist'])

    }, (error) => {
      this._snackBar.open('some error occured', 'OK', {
        duration: 4000
      })
    })



  }

}

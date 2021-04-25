import { ChangeDetectorRef, Component, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

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
  public createFormGroup: FormGroup
  public categoryList: string[] = ["mobile", "laptops"];
  public productId
  public detailData
  // public imagesList = []
  // public imagesListRaw = []
  constructor(private _formbuilder: FormBuilder, private cd: ChangeDetectorRef, private _productService: ProductsService,
    private _snackBar: MatSnackBar, private _router: Router) {
  }

  
  

  ngOnInit(): void {



    this.createFormGroup = this._formbuilder.group({
      productGroup: this._formbuilder.group({
        productName: ['', [Validators.required]],
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
          this.createFormGroup.controls['productGroup'].patchValue(data)
          this.createFormGroup.controls['stockGroup'].patchValue(data)
          this.productId = data._id
        }
      })
    }

    
  }

  createProduct() {

    var productName = this.createFormGroup.controls['productGroup'].value['productName']
    var productType = this.createFormGroup.controls['productGroup'].value['productType']
    var description = this.createFormGroup.controls['productGroup'].value['description']
    // var images = this.createFormGroup.controls['productGroup'].value['images']
    var stock = this.createFormGroup.controls['stockGroup'].value['stock']
    var price = this.createFormGroup.controls['stockGroup'].value['price']

    var product_data: Product = {
      productName: productName,
      productType: productType,
      description: description,
      // images: images,
      stock: stock,
      price: price,
    }

    var formData = new FormData();
    Object.keys(product_data).forEach((key) => {
      formData.append(key, product_data[key])
    });
 
    // formData.append("images",  this.imagesListRaw[0])

    this._productService.createProduct(environment.urls.createProduct, formData).subscribe((response: any) => {
      let snackbarAction = this._snackBar.open(response.message, "Yes", {
        duration: 4000
      })

      this._router.navigate(['/productslist'])

    }, (error) => {
      console.log("error", error)
    })


  }

  onFileChange(event) {

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // this.imagesListRaw = event.target.files

      Array.from(event.target.files).forEach((file: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          // this.imagesList.push(reader.result)
          this.cd.markForCheck()
        }

      })

      // this.createFormGroup.controls['productGroup'].value['images'] =  event.target.files
    }

  }

  displayAutoComplete(option) {
    if (option == null) return ""
    else if (option == undefined) return ""
    else if (option.displayName) return option.displayName
    else if (option.model) return option.model
    else return option
  }

  autoCompleteSearch(searchText, list, elementName = undefined) {

    if (typeof searchText == 'string') {
      if (elementName) {
        const filterValue = searchText.toLowerCase();
        var filteredList = list.filter((option) => {
          return option[elementName]?.toLowerCase().includes(filterValue)
        })
        return filteredList
      }
      else {
        const filterValue = searchText.toLowerCase();
        var filteredList = list.filter((option) => {
          return String(option).toLowerCase().includes(filterValue)
        })

        return filteredList
      }
    }
    else return []



  }

  editProduct() {



    var productName = this.createFormGroup.controls['productGroup'].value['productName']
    var productType = this.createFormGroup.controls['productGroup'].value['productType']
    var description = this.createFormGroup.controls['productGroup'].value['description']
    // var images = this.createFormGroup.controls['productGroup'].value['images']
    var stock = this.createFormGroup.controls['stockGroup'].value['stock']
    var price = this.createFormGroup.controls['stockGroup'].value['price']

    var product_data = {
      _id : this.productId,
      productName: productName,
      productType: productType,
      description: description,
      // images: images,
      stock: stock,
      price: price,
    }

    var formData = new FormData();
    Object.keys(product_data).forEach((key) => {
      formData.append(key, product_data[key])
    });

    // formData.append('images',)
    this._productService.updateProduct(environment.urls.updateProduct, formData).subscribe((response: any) => {
      let snackbarAction = this._snackBar.open(response.message, "Ok", {
        duration: 4000
      })

      this._router.navigate(['/productslist'])

    }, (error) => {
      console.log("error", error)
    })



  }





}

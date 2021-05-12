import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxFileDropModule } from "ngx-file-drop";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ProductsComponent } from "./products.component";
import { ProductsService } from "src/app/services/products.service";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from "src/app/model/products";
import { Observable, of, throwError } from "rxjs";
import { routes } from "src/app/app-routing.module";

describe("ProductsComponent", () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let productsService: any;
  let matSnackBarSpy: any;

  beforeEach(async(() => {

    const matSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const productsServiceSpy = jasmine.createSpyObj('productsService', ['createProduct','updateProduct','editProductData','getEditProductData'])

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        TextFieldModule,
        MatTabsModule,
        NgxFileDropModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatSnackBarModule,
        HttpClientModule,
        MatMenuModule,
        MatStepperModule,
        RouterTestingModule.withRoutes(routes),
        MatFormFieldModule
      ],
      declarations: [ProductsComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: MatSnackBar, useValue: matSpy }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductsComponent);
      component = fixture.componentInstance;
      productsService = TestBed.inject(ProductsService)
      matSnackBarSpy = TestBed.inject(MatSnackBar)
      // fixture.detectChanges();
    });
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should createProduct", () => {
    let data = {
      productName: "Samsung A-50",
      productId: "P-001",
      productType: "mobile",
      description: "A samsung Phone",
      stock: 125,
      price: 20000
    }

    productsService.getEditProductData.and.returnValue(of(data))
    productsService.createProduct.and.returnValue(of({
      _id: "6097e07ef7ee360b6c7dcd36",
      message: "Entity Created Successfully",
    }))

    fixture.detectChanges();
    
    component.fromGroup.controls['productGroup'].patchValue(data)
    component.fromGroup.controls['stockGroup'].patchValue(data)
    const result = component.createProduct()
    expect(matSnackBarSpy.open).toHaveBeenCalled();

  })


  it('should error createProduct', () => {
    let data = {
      productName: "Samsung A-50",
      productId: "P-001",
      productType: "mobile",
      description: "A samsung Phone",
      stock: 125,
      price: 20000
    }
    productsService.getEditProductData.and.returnValue(of(data))
    productsService.createProduct.and.returnValue(throwError(new Error("some error occured")))
    fixture.detectChanges();
    component.fromGroup.controls['productGroup'].patchValue(data)
    component.fromGroup.controls['stockGroup'].patchValue(data)
    const result = component.createProduct()
    expect(matSnackBarSpy.open).toHaveBeenCalled();

  })

  it("should editProduct", () => {

    let data = {
      productName: "Samsung A-50",
      productId: "P-001",
      productType: "mobile",
      description: "A samsung Phone",
      stock: 125,
      price: 20000
    }
    component.productId = "1242142142"

    fixture.detectChanges();

    component.fromGroup.controls['productGroup'].patchValue(data)
    component.fromGroup.controls['stockGroup'].patchValue(data)

    productsService.updateProduct.and.returnValue(of({
      _id: "6097e07ef7ee360b6c7dcd36",
      message: "Entity Edited Successfully",
    }))

    const result = component.editProduct()

    expect(matSnackBarSpy.open).toHaveBeenCalled();

    expect(productsService.updateProduct).toHaveBeenCalled();

  })

  it('should error editProduct', () => {

    let data = {
      productName: "Samsung A-50",
      productId: "P-001",
      productType: "mobile",
      description: "A samsung Phone",
      stock: 125,
      price: 20000
    }

    fixture.detectChanges();

    component.fromGroup.controls['productGroup'].patchValue(data)
    component.fromGroup.controls['stockGroup'].patchValue(data)

    productsService.updateProduct.and.returnValue(throwError(new Error("some error occured")))

    const result = component.editProduct()
    expect(matSnackBarSpy.open).toHaveBeenCalled();

  })

  it("should ngOnInit",()=>{
    localStorage.setItem("mode","edit")

    let data = {
      productName: "Samsung A-50",
      productId: "P-001",
      productType: "mobile",
      description: "A samsung Phone",
      stock: 125,
      price: 20000,
      _id: 1531
    }

    productsService.getEditProductData.and.returnValue(of(data))

    component.ngOnInit()

    expect(component.productId).toBeTruthy()

  })

  it("should ngOnInit no Data",()=>{
    localStorage.setItem("mode","edit")
    let data = {}
    productsService.getEditProductData.and.returnValue(of(''))
    component.ngOnInit()
    expect(component.productId).toBeUndefined()

  })

});

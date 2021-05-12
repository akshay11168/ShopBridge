import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './product-list.component';
import { ProductsService } from 'src/app/services/products.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { MatSnackBarHarness } from "@angular/material/snack-bar/testing";
import { ProductListDataSource, ProductListItem } from './product-list-datasource';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import { Observable, of, throwError } from 'rxjs';
import { Products } from 'src/assets/mock-data/db.data';
import { ChangeDetectorRef, DebugElement, Input } from '@angular/core';
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";

import { Location } from "@angular/common" ;
import { OverlayContainer } from "@angular/cdk/overlay";
import {By} from '@angular/platform-browser';

import { routes } from "src/app/app-routing.module"
import { Router } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsService : any;
  let changeDetectorRef: any;
  let matSnackBarSpy :any;
  let loader: HarnessLoader;
  let el: DebugElement;
  let location : Location;
  let router : any

  beforeEach(async(() => {
    
    const matSpy = jasmine.createSpyObj('MatSnackBar', ['open','onAction']);
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getCurrentMessage','getProducts','getProduct','deleteProduct','currentMessage','editProduct'])
    const changeDetectorRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges'])
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        // RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: ChangeDetectorRef , useValue: changeDetectorRefSpy },
        { provide: MatSnackBar, useValue: matSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductListComponent);
      productsService = TestBed.inject(ProductsService)
      productsService.getCurrentMessage.and.returnValue(of('aaa',"aa"))
      productsService.deleteProduct.and.returnValue(of( '{"abc":"abc"}'))
      productsService.getProduct.and.returnValue(of( '{"abc":"abc"}'))
      productsService.getProducts.and.returnValue(of(Products))
      component = fixture.componentInstance;
      changeDetectorRef = TestBed.inject(ChangeDetectorRef)
      matSnackBarSpy = TestBed.inject(MatSnackBar)
      loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
      el = fixture.debugElement;
      location  = TestBed.inject(Location)
      router  = TestBed.inject(Router)
      component.table = { dataSource : ""}
    });;
  }));

  it('should editProduct',fakeAsync(()=>{
    productsService.editProduct.and.returnValue(of('Hello', 'World'))
    let data = {
      productName: "Samsung A-50",
      productId: "P-001",
      productType: "mobile",
      description: "A samsung Phone",
      stock: 125,
      price: 20000,
      _id: 1531
    }
    component.editProduct(data)
    tick() 
    // expect(location.path()).toBe('/products')
    expect(router.navigate).toHaveBeenCalled()
  }))

  it('should deleteProduct',()=>{
    // productsService.editProduct.and.returnValue(of('Hello', 'World'))
    productsService.getProducts.and.returnValue(of(Products))
    productsService.deleteProduct.and.returnValue(of( '{"abc":"abc"}'))

    component.table = { dataSource : ""}
    component.deleteProduct('P-006')
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  })

  it('should ngOnInit with no current message',()=>{
    productsService.getCurrentMessage.and.returnValue(of(''))
    productsService.getProduct.and.returnValue(of( '{"abc":"abc"}'))
    component.ngOnInit()
    expect(component.filterByName).toBeFalsy()
  })

  it('should error deleteProduct',()=>{
    productsService.deleteProduct.and.returnValue(throwError(new Error('some error occured')))
    productsService.getProducts.and.returnValue(of(Products))

    component.deleteProduct('P-006')
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  })

  it('should ngOnInit',()=>{
    productsService.getCurrentMessage.and.returnValue(of('Hello', 'World'))
    productsService.getProduct.and.returnValue(of( '{"abc":"abc"}'))
    component.ngOnInit()
    expect(component.filterByName).toBeTruthy()
  })

  it('should getSpecificProduct',()=>{
    productsService.getProduct.and.returnValue(of( '{"abc":"abc"}'))
    productsService.currentMessage.and.returnValue(of('aaa'))
    component.filterByName = "a"
    component.getSpecificProduct()
    expect(component.dataSource).toBeTruthy()
  })

  it('should error getSpecificProduct',()=>{
    productsService.getProduct.and.returnValue(throwError(new Error("some error occured")))
    productsService.currentMessage.and.returnValue(of( 'aaa'))
    component.filterByName = "a"
    component.getSpecificProduct()
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  })

  it('should else getSpecificProduct',()=>{
    productsService.getProduct.and.returnValue(of( '{"abc":"abc"}'))
    productsService.getProducts.and.returnValue(of(Products))
    productsService.getCurrentMessage.and.returnValue(of('aaa'))

    component.filterByName = ""
    component.getSpecificProduct()
    expect(component.dataSource).toBeTruthy()
    
  })

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should getAllProducts',()=>{
    productsService.getProducts.and.returnValue(of(Products))
    productsService.getCurrentMessage.and.returnValue(of("aaa"))
    component.getAllProducts()
    expect(component.productsList.length).toBeGreaterThanOrEqual(1,'stockList not updated')
  })

  it('should error getAllProducts',()=>{
    productsService.getProducts.and.returnValue(throwError(new Error("some error occured")))
    component.getAllProducts()
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  })

  it("should detailProduct",()=>{
    productsService.getProduct.and.returnValue(of( '{"abc":"abc"}'))
    component.detailProduct('P-003')
    expect(component.detailData).toBeTruthy()
  })

  it("should error detailProduct",()=>{
    productsService.getProduct.and.returnValue(throwError(new Error("some error occured")))
    component.detailProduct('P-003')
    expect(matSnackBarSpy.open).toHaveBeenCalled();
    expect(component.detailData).toBeUndefined()
  })


  it(" should apply filter ", ()=>{
    fixture.detectChanges()
    var input = el.nativeElement.querySelector(".input_product")
    input.value = "aa"
    component.dataSource = {
      filter : ""
    }
    input.dispatchEvent(new Event('keyup'))

    expect(component.dataSource.filter).toBeTruthy()

  })



});

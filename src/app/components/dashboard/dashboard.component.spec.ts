import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';



import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
import { ProductsService } from 'src/app/services/products.service';
import { of, throwError } from 'rxjs';
import { Products } from 'src/assets/mock-data/db.data';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let productsService: any;
  let matSnackBarSpy :any;

  beforeEach(async(() => {

    const matSpy = jasmine.createSpyObj('MatSnackBar', ['open','onAction']);
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts'])
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        ChartsModule,
      ],
      declarations: [DashboardComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: MatSnackBar, useValue: matSpy }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        productsService = TestBed.inject(ProductsService)
        matSnackBarSpy = TestBed.inject(MatSnackBar)
        // fixture.detectChanges();

      });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should randomColor', () => {
    const color = component.randomColor()

    expect(color).toContain('rgb')
    
  })

  it('should getAllProducts',()=>{
    
    productsService.getProducts.and.returnValue(of(Products))

    fixture.detectChanges()

    expect(component.stockList.length).toBeGreaterThanOrEqual(1,'stockList not updated')
  })

  it('should error getAllProducts',()=>{
    productsService.getProducts.and.returnValue(throwError(new Error("some error occured")))
    fixture.detectChanges()
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  })

});

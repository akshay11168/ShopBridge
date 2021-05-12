import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {TextFieldModule} from '@angular/cdk/text-field';
import { CustomRupeeStyleDirective } from './custom-rupee-style.directive';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsService } from './services/products.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  
  let fixture: ComponentFixture<AppComponent>;
  let component : AppComponent;
  let productsService : any;

  beforeEach(async(() => {

    const productServiceSpy = jasmine.createSpyObj('productService',["getToggleSideNavData"])
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
        MatMenuModule,
        HttpClientModule,
        MatStepperModule,
        MatSnackBarModule
      ],

      declarations: [
        AppComponent,
        SideNavbarComponent,
        ProductsComponent,
        ProductListComponent,
        TopNavbarComponent
      ],
      providers:[
        {provide : ProductsService ,useValue: productServiceSpy}
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      productsService = TestBed.inject(ProductsService)
    });
  }));

  it('should create the app', () => {
    
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ShopBridge'`, () => {
    expect(component.title).toContain('ShopBridge');
  });

  it('should get sideNavStatus',()=>{

    // productService.getToggleSideNavData.subscribe((response)=>{
    //   expect(response).toBeFalsy()
    // })

    // productService.getToggleSideNavData.and.returnValue(of("abc","abc"))
    productsService.getToggleSideNavData.and.returnValue( of('Hello', 'World'))
    expect(component.sideNavSatus).toBeFalsy()
    fixture.detectChanges()
  })
});

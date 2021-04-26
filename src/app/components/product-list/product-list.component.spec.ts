import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './product-list.component';
import { ProductsService } from 'src/app/services/products.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsService : ProductsService;

  let mockProductList = [     {
    productName: 'Iphone 11',
    productType: 'mobile',
    description: 'It is a smartPhone',
    stock: 223,
    price: 110000,
  },
  {
    productName: 'Iphone 12',
    productType: 'mobile',
    description: 'It is a nice smartPhone',
    stock: 20,
    price: 9999999,
  }
]

  beforeEach(async(() => {
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
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
      ],
      providers: [ProductsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService)
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });


  // it('testing getAllProducts function',fakeAsync(()=>{


  //   let productSpy = spyOn(productsService,'getProducts').and.returnValue(of(mockProductList))
  //   let subspy= spyOn(productsService.getProducts(environment.urls.getAllProducts),'subscribe')

  //   component.ngOnInit()
  //   tick()

  //   expect(productSpy).not.toHaveBeenCalledBefore(subspy)
  //   expect(subspy).not.toHaveBeenCalled()

  // }))

  // it('testing productsList list population on load ',fakeAsync(()=>{
  //   component.ngOnInit()

  //   expect(component.productsList).toBeDefined();
  //   expect(component.productsList.length).toBeGreaterThan(0)
  // }))


});

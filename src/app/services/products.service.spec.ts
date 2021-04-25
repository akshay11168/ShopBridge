import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../model/products';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let productService: ProductsService;
  let httpTestCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductsService
      ]
    });

    service = TestBed.inject(ProductsService);
  });

  beforeEach(() => {
    productService = TestBed.inject(ProductsService)
    httpTestCtrl = TestBed.inject(HttpTestingController)
  })

  afterEach(()=>{
    httpTestCtrl.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const testProducts: Product[] = [
      {
        productName: 'Iphone 11',
        productType: 'mobile',
        description: 'It is a smartPhone',
        stock: 223,
        price: 110000,
      },
      {
        productName: 'A30',
        productType: 'mobile',
        description: 'It is a smartPhone',
        stock: 333,
        price: 99999,
      }
    ]

    productService.getProducts(environment.urls.getAllProducts).subscribe((products)=>{
      expect(testProducts).toBe(products,'should check mocked data')
    })

    const req = httpTestCtrl.expectOne(environment.urls.getAllProducts)

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json')

    req.flush(testProducts)

  })


  // it('should test createProduct', () => {
  //   const testProduct: Product=       {
  //       productName: 'Iphone 11',
  //       productType: 'mobile',
  //       description: 'It is a smartPhone',
  //       stock: 223,
  //       price: 110000,
  //     }

  //   productService.createProduct(environment.urls.getAllProducts,testProduct).subscribe((product)=>{
  //     // expect(testProduct).toBe(product[0],'should check mocked data')
  //       // expect(product).toBeTruthy()

  //   })

  //   const req = httpTestCtrl.expectOne(environment.urls.createProduct)

  //   expect(req.cancelled).toBeFalsy();
  //   expect(req.request.responseType).toEqual('json')

  //   req.flush(testProduct)

  // })




});

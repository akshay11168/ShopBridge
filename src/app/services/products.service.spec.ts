import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Product } from "../model/products";
import { environment } from "src/environments/environment";
import { Products } from "src/assets/mock-data/db.data";
import { subscribeOn } from "rxjs/operators";

describe("ProductsService", () => {
  let productService: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    productService = TestBed.inject(ProductsService);
  });

  beforeEach(() => {
    productService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(productService).toBeTruthy();
  });

  it("should getProducts", () => {
    productService.getProducts("/get/products/").subscribe((response) => {
      const product = response.find((product) => {
        return product.productId == "P-001";
      });

      expect(response.length).toBe(5);

      expect(product.productId).toBe("P-001");
    });

    const req = httpTestingController.expectOne("/get/products/");

    expect(req.request.method).toEqual("GET");

    req.flush(Object.values(Products));
  });

  it("should getProduct", () => {
    productService
      .getProduct("/get/products/", { productName: "Samsung A-50" })
      .subscribe((response) => {
        const product = response.find((product) => {
          return product.productId == "P-001";
        });

        expect(response.length).toBeGreaterThanOrEqual(
          1,
          "Length of response didn't match"
        );

        expect(product.productId).toBe("P-001", "course ID didn't match");
      });

    const req = httpTestingController.expectOne("/get/products/");

    expect(req.request.method).toEqual("POST", "imporper request method");

    req.flush(Object.values(Products));
  });

  it("should createProduct", () => {
    const createProduct = {
      productName: "Iphone 11",
      productType: "mobile",
      description: "It is a smartPhone",
      stock: 223,
      price: 110000,
      productId: "P-006",
    };

    productService
      .createProduct("/product/create/", createProduct)
      .subscribe((respone) => {
        expect(respone).toBeTruthy();
        expect(respone.message).toBe("Entity Created Successfully");
      });

    const req = httpTestingController.expectOne("/product/create/");

    expect(req.request.method).toBe("POST", "Imporper Request Method");

    req.flush({
      _id: "6097e07ef7ee360b6c7dcd36",
      message: "Entity Created Successfully",
    });
  });

  it("should deleteProduct", () => {
    const data = { _id: "172490821" };

    productService
      .deleteProduct("/product/delete", data)
      .subscribe((response) => {
        expect(response).toBeTruthy();
        expect(response).toBe("Entity Deleted Successfully");
      });

    const req = httpTestingController.expectOne("/product/delete");

    expect(req.request.method).toBe("POST");
    req.flush("Entity Deleted Successfully");
  });

  it("should updateProduct", () => {
    const updateProduct = {
      productName: "Iphone 11",
      productType: "mobile",
      description: "It is a smartPhone",
      stock: 223,
      price: 110000,
      productId: "P-006",
    };

    productService
      .updateProduct("/product/update/", updateProduct)
      .subscribe((respone) => {
        expect(respone).toBeTruthy();
        expect(respone.message).toBe("Entity Edited Successfully");
      });

    const req = httpTestingController.expectOne("/product/update/");

    expect(req.request.method).toBe("PUT", "Imporper Request Method");

    req.flush({
      _id: "6097e07ef7ee360b6c7dcd36",
      message: "Entity Edited Successfully"
    });
  });

  it("should searchProduct",()=>{
    
    productService.currentMessage.subscribe(data =>{
      expect(data).toBeFalsy()
    })
    
    productService.searchProduct("")

  })

  it("should editProduct",()=>{
    
    productService.editProductData.subscribe(data =>{
      expect(data).toBeFalsy()
    })
    
    productService.editProduct("")

  })

  it("should toggleSideNav",()=>{
    
    productService.toggleSideNavData.subscribe(data =>{
      if(data) expect(data).toBeTruthy()
      else expect(data).toBeFalsy()
    })
    
    productService.toggleSideNav("abc")

  })


  it("should getCurrentMessage",()=>{
    const result = productService.getCurrentMessage()
    expect(result).toBeTruthy()
  })


  it("should getEditProductData",()=>{
    const result = productService.getEditProductData()
    expect(result).toBeTruthy()
  })


  it("should getToggleSideNavData",()=>{
    const result = productService.getToggleSideNavData()
    expect(result).toBeTruthy()
  })

  it("should getToggleSideNavSource",()=>{
    const result = productService.getToggleSideNavSource()
    expect(result).toBeTruthy()
  })



});

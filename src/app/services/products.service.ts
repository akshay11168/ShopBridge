import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/products'
import { BehaviorSubject } from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  // used to get products
  public getProducts(url: string, options: object = {}): Observable<Product[]> {
    return <Observable<Product[]>>this.http.get(url, options)
  }

  // used to create Product
  public createProduct(url: string, options: object ):any {
    return <Observable<any>>this.http.post(url, options)
  }

  // used to deleteProduct 
  public deleteProduct(url: string, options: object ): any {
    return <Observable<any>>this.http.post(url, options)
  }

  // used to updateProduct
  public updateProduct(url: string, options: object ): any {
    return <Observable<any>>this.http.put(url, options)
  }

  // used to get a specific product
  public getProduct(url: string, options: object ): Observable<any> {
    return <Observable<Product[]>>this.http.post(url, options)
  }

  // navbar and product-list sibling interaction
  private messageSource = new BehaviorSubject<string>('')
  currentMessage = this.messageSource.asObservable()
  public searchProduct(productName) {
    this.messageSource.next(productName)
  }
  public getCurrentMessage(){
    return this.currentMessage
  }

  // product-list and products component interaction to edit a specific Product
  private editProductSource = new BehaviorSubject<string>('')
  editProductData = this.editProductSource.asObservable()
  public editProduct(editProductData) {
    this.editProductSource.next(editProductData)
  }
  public getEditProductData(){
    return this.editProductData
  }

  // for toggling side nav bar
  public toggleSideNavSource = new BehaviorSubject<boolean>(false)
  toggleSideNavData = this.toggleSideNavSource.asObservable()
  public toggleSideNav(toggleSideNavData) {
    this.toggleSideNavSource.next(toggleSideNavData)
  }
  public getToggleSideNavData(){
    return this.toggleSideNavData
  }


  public getToggleSideNavSource(){
    return this.toggleSideNavSource
  }



}

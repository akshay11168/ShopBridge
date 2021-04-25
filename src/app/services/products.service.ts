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

  public getProducts(url: string, options: object = {}): Observable<Product[]> {
    return <Observable<Product[]>>this.http.get(url, options)
  }

  public createProduct(url: string, options: object = {}): Observable<Product[]> {
    return <Observable<Product[]>>this.http.post(url, options)
  }

  public deleteProduct(url: string, options: object = {}): Observable<Product[]> {
    return <Observable<Product[]>>this.http.delete(url, options)
  }

  public updateProduct(url: string, options: object = {}): Observable<Product[]> {
    return <Observable<Product[]>>this.http.put(url, options)
  }

  public getProduct(url: string, options: object = {}): Observable<any> {
    return <Observable<Product[]>>this.http.post(url, options)
  }

  private messageSource = new BehaviorSubject<string>('')
  currentMessage = this.messageSource.asObservable()
  public searchProduct(productName) {
    this.messageSource.next(productName)
  }

  private editProductSource = new BehaviorSubject<string>('')
  editProductData = this.editProductSource.asObservable()
  public editProduct(editProductData) {
    this.editProductSource.next(editProductData)
  }

  public toggleSideNavSource = new BehaviorSubject<boolean>(false)
  toggleSideNavData = this.toggleSideNavSource.asObservable()
  public toggleSideNav(toggleSideNavData) {
    this.toggleSideNavSource.next(toggleSideNavData)
  }




}

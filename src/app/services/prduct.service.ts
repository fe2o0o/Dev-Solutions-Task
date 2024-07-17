import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrductService {

  constructor(private _HttpClient:HttpClient) { }

  getProducts(): Observable<any>{
    return this._HttpClient.get('https://fakestoreapi.com/products')
  }


  getAllCategories(): Observable<any>{
    return this._HttpClient.get('https://fakestoreapi.com/products/categories')
  }

  getSpacificProduct(id: any):Observable<any> {
    return this._HttpClient.get(`https://fakestoreapi.com/products/${id}`)
  }

  getProductsByCategory(cat: string):Observable<any> {
    return this._HttpClient.get(`https://fakestoreapi.com/products/category/${cat}`)
  }
}

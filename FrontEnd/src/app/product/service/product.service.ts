import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../model/product';
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/home')
  }

  getCategoryById(id: number): Observable<Product> {
    return this.http.get<Product>(API_URL + '/home/' + id)
  }

  getProductByName(nameSearch: string): Observable<Product> {
    let params = new HttpParams().set('nameSearch', nameSearch);
    console.log(params.toString())
    return this.http.get<Product>(API_URL + '/home/search', {params});
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<Product>(API_URL + '/home', product)
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete<Product>(API_URL + '/home/' + id)
  }
}


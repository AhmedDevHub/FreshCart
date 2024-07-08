import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProuductService {

  constructor(private _HttpClient:HttpClient) {}
  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`
  
  getProducts(pageNum:number = 1):Observable<any> {
    return this._HttpClient.get(this.baseUrl +`products?page=${pageNum}`);
  }
  getProductDetails(id:any):Observable<any> {
    return this._HttpClient.get(this.baseUrl +`products/${id}`);
  }
  getCategories():Observable<any> {
    return this._HttpClient.get(this.baseUrl +'categories');
  }
  getCategroiesDetails(id:string|null):Observable<any> {
    return this._HttpClient.get(this.baseUrl +`categories/${id}`);
  }
  getBrands(): Observable<any> {
    return this._HttpClient.get(
      this.baseUrl+`brands`
    );
  }
  getBrandDetails(id:string|null):Observable<any> {
    return this._HttpClient.get(this.baseUrl+`brands/${id}`);
  }

}

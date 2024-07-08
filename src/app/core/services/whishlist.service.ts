import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;
  wishCount: BehaviorSubject<number> = new BehaviorSubject(0);

  getWishList():Observable <any>{
    return this._HttpClient.get(this.baseUrl + `wishlist`);
  }

  addToWishList(prodId:string|undefined): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist`,
      {
        productId:prodId,
      }
    );
  }

  removeWishList(prodId:string|undefined):Observable <any>{
    return this._HttpClient.delete(this.baseUrl + `wishlist/${prodId}`);
  }
}

// myToken:any ={
//   token:localStorage.getItem('_token')
// }
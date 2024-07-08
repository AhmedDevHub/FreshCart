import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0)

  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `cart`,
      {
        productId: prodId
      },
    );
  }

  getCartUser(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `cart`,
    );
  }

  updateCartCount( prodId: string,countNum: number): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `cart/${prodId}`,
      {
        count: countNum
      },
    )
  }

  removeCartItem(prodId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${prodId}`,
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart`,
    );
  }

  checkOut(cartId: string | null, orderInfo: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl +
      `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddrees: orderInfo
      },
    )
  }

  getOrders(cartOwner: any): Observable<any> {
    return this._HttpClient.get(
      this.baseUrl + `orders/user/${cartOwner}`
    );
  }
}

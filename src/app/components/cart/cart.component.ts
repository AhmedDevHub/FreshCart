import { CommonModule } from "@angular/common";
import { Component, OnInit, Renderer2 } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CuttextPipe } from "src/app/core/pipe/cuttext.pipe";
import { CartService } from "src/app/core/services/cart.service";


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2) { }
  cartData: any = {};
  isEmpty: boolean = true;

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        if (response.numOfCartItems == 0) {
          this.isEmpty = true;
        } else {
          this.cartData = response.data;
          this.isEmpty = false;
        }
      },
    })
  }
  changeCount(prodId: string,count: number,plusBtn: HTMLButtonElement,minusBtn: HTMLButtonElement): void {
    if (count >= 1) {
      this._Renderer2.setAttribute(plusBtn, 'disabled', 'true');
      this._Renderer2.setAttribute(minusBtn, 'disabled', 'true');

      this._CartService.updateCartCount(prodId, count).subscribe({
        next: ({ data }) => {
          this.cartData = data;

          this._Renderer2.removeAttribute(plusBtn, 'disabled');
          this._Renderer2.removeAttribute(minusBtn, 'disabled');
        },
      });
    }
  }

  removeItem(prodId: string): void {
    this._CartService.removeCartItem(prodId).subscribe({
      next: (response) => {
        this.cartData = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);

        if (response.numOfCartItems == 0) {
          this.isEmpty = true;
        }
      },
    });
  }
  clear(): void {
    this._CartService.clearCart().subscribe({
      next: () => {
        this.cartData = {};
        this.isEmpty = true;
        this._CartService.cartNumber.next(0);
      },
    })
  }
}


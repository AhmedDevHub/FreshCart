import { CommonModule } from "@angular/common";
import { Component, OnInit, Renderer2 } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/core/interfaces/product";
import { CuttextPipe } from "src/app/core/pipe/cuttext.pipe";
import { CartService } from "src/app/core/services/cart.service";
import { WhishlistService } from "src/app/core/services/whishlist.service";



@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WhishlistService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,

  ) { }
  wishlistData: Product[] = [];
  isEmpty: boolean = true;

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: ({ data }) => {
        if (data.length == 0) {
          this.isEmpty = true;
        } else {
          this.wishlistData = data;
          this.isEmpty = false;
        }
      },
    });
  }

  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
    });
  }

  removeWish(id: string): void {
    this._WishlistService.removeWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.getWishList().subscribe({
          next: ({ data }) => {
            if (data.length == 0) {
              this.isEmpty = true;
            } else {
              this.wishlistData = data;
              this.isEmpty = false;
            }
          },
        });

        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishlistService.wishCount.next(response.data.length);

        if (response.data.length == 0) {
          this.isEmpty = true;
        }
      },
    });
  }
}

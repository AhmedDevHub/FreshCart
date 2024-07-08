import { CommonModule } from "@angular/common";
import { Component, OnInit, Renderer2 } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { ToastrService } from "ngx-toastr";
import { Product } from "src/app/core/interfaces/product";
import { CuttextPipe } from "src/app/core/pipe/cuttext.pipe";
import { SearchPipe } from "src/app/core/pipe/search.pipe";
import { CartService } from "src/app/core/services/cart.service";
import { HomeComponent } from "../home/home.component";
import { ProuductService } from "src/app/core/services/prouduct.service";
import { WhishlistService } from "src/app/core/services/whishlist.service";



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe, NgxPaginationModule,FormsModule,SearchPipe,NgxPaginationModule,HomeComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductsService: ProuductService,
    private _CartService: CartService,
    private _WishlistService: WhishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}

  productsData: Product[] = [];
  inputTerm: string = '';
  pageSize: number = 0;
  page: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }

  pageChanged(event: number): void {
    this._ProductsService.getProducts(event).subscribe({
      next: (response) => {
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.page = response.metadata.currentPage;
        this.total = response.results;
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

  addWish(
    id: string,
    addWishBtn: HTMLDivElement,
    removeWishBtn: HTMLDivElement
  ): void {
    this._WishlistService.addToWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.wishCount.next(response.data.length);
        this._ToastrService.success(response.message);
        this._Renderer2.addClass(addWishBtn, 'd-none');
        this._Renderer2.removeClass(removeWishBtn, 'd-none');
      },
    });
  }

  removeWish(
    id: string,
    addWishBtn: HTMLDivElement,
    removeWishBtn: HTMLDivElement
  ): void {
    this._WishlistService.removeWishList(id).subscribe({
      next: (response) => {
        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishlistService.wishCount.next(response.data.length);

        this._Renderer2.addClass(removeWishBtn, 'd-none');
        this._Renderer2.removeClass(addWishBtn, 'd-none');
      },
    });
  }
}

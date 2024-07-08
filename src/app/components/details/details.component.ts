import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { ToastrService } from "ngx-toastr";
import { CartService } from "src/app/core/services/cart.service";
import { ProuductService } from "src/app/core/services/prouduct.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProuductService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
  ) { }
  productId: any;
  productDetails: any = {};

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = param.get('id');
      },
    })

    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: ({ data }) => {
        this.productDetails = data;
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

  productsSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
}

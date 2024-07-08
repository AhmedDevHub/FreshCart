import { CommonModule } from "@angular/common"
import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from "@angular/core"
import { RouterLink, RouterLinkActive, Router } from "@angular/router"
import { CartService } from "src/app/core/services/cart.service"
import { WhishlistService } from "src/app/core/services/whishlist.service"


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router: Router,
    private _WishlistService: WhishlistService,
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) { }
  @ViewChild('navBar') navElment!: ElementRef
  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navElment.nativeElement, 'pe-5')
      this._Renderer2.addClass(this.navElment.nativeElement, 'shadow')
    } else {
      this._Renderer2.removeClass(this.navElment.nativeElement, 'pe-5')
      this._Renderer2.removeClass(this.navElment.nativeElement, 'shadow')
    }
  }
  cartNum: number = 0;
  wishNum: number = 0;
  ngOnInit(): void {
    
    this._CartService.cartNumber.subscribe({
      next: (count) => {
        this.cartNum = count;
      },
    });

    this._WishlistService.wishCount.subscribe({
      next: (count) => {
        this.wishNum = count;
      },
    });

    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this._WishlistService.wishCount.next(response.data.length);
      },
    });
  }

  signOut(): void {
    localStorage.removeItem('_token');
    localStorage.removeItem('cartOwner');
    this._Router.navigate(['/login']);
  }
};


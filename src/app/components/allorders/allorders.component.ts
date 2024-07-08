import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { CuttextPipe } from "src/app/core/pipe/cuttext.pipe";
import { CartService } from "src/app/core/services/cart.service";



@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe, NgxPaginationModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService:CartService){}
  cartOwner: any = '';
  ordersData: any[] = [];
  isEmpty: boolean = true;
ngOnInit(): void {
  this.cartOwner = localStorage.getItem('cartOwner');
  this._CartService.getOrders(this.cartOwner).subscribe({
    next: (response) => {
      this.isEmpty = false;
      this.ordersData = response;
    },
  });
}
}


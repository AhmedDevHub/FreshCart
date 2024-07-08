import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Brand } from "src/app/core/interfaces/product";
import { ProuductService } from "src/app/core/services/prouduct.service";


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _ProuductService:ProuductService) {}

  brandsData: Brand[] = [];

  ngOnInit(): void {
    this._ProuductService.getBrands().subscribe({
      next: ({ data }) => {
        this.brandsData = data;
      },
    });
  }
}

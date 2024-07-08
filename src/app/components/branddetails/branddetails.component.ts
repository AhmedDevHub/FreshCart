import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink, ActivatedRoute } from "@angular/router";
import { Brand } from "src/app/core/interfaces/product";
import { ProuductService } from "src/app/core/services/prouduct.service";

@Component({
  selector: 'app-branddetails',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './branddetails.component.html',
  styleUrls: ['./branddetails.component.scss']
})
export class BranddetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProuductService:ProuductService ) { }
    brandId: any
    brandDetails: Brand = {} as Brand
    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next: (params) => {
          this.brandId = params.get('id')
        }
      })
      this._ProuductService.getBrandDetails(this.brandId).subscribe({
        next: (response) => {
          this.brandDetails = response.data
        },
      });
    }
}

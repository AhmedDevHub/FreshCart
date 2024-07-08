import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Category } from "src/app/core/interfaces/product";
import { ProuductService } from "src/app/core/services/prouduct.service";


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProuductService: ProuductService,
  ) { }
  categoryData: Category[] = [];
  ngOnInit(): void {
    this._ProuductService.getCategories().subscribe({
      next: (response) => {
        this.categoryData = response.data;
      }
    })

  }


}

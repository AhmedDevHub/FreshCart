import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {

}

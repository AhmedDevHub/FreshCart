import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from 'src/app/components/nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
  isButtonVisible: boolean = false;
  goToUp(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    @HostListener('window:scroll')
    onScroll(): void {
      this.isButtonVisible = window.scrollY > 100;
    }
}

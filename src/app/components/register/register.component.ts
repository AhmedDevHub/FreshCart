
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import lottie from 'lottie-web';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) { }

  isLoading: boolean = false;
  errorMsg: string = '';
  animation: any;
  container: Element | null = null;

 registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  registerData(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.container = document.getElementById(
      'your-animation-container-register'
    );

    if (this.container) {
      this.animation = lottie.loadAnimation({
        container: this.container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './assets/images/signup.json',
      });
    }
  }
}

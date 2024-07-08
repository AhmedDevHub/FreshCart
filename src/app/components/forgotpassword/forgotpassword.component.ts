import { CommonModule } from "@angular/common";
import { Component, Renderer2 } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/core/services/auth.service";


@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _Renderer2: Renderer2
  ) { }
  isLoading: boolean = false;
  errMsg: string = '';
  userEmail: string = '';

  forgotPasswordForm: FormGroup = this._FormBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
  });

  resetCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(6),
        ],
      },
    ],
  });

  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [''],
    newPassword: [
      '',
      { validators: [Validators.required, Validators.pattern(/^\w{6,}$/)] },
    ],
  });

  handleForm(forgotPassForm: HTMLFormElement, codeForm: HTMLFormElement): void {
    this.isLoading = true;
    const email = this.forgotPasswordForm.value;
    this.userEmail = email.email;
    this._AuthService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this._ToastrService.success(response.message);
        this._Renderer2.removeClass(codeForm, 'd-none');
        this._Renderer2.addClass(forgotPassForm, 'd-none');
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message;
      },
    });
  }

  handleResetForm(
    codeForm: HTMLFormElement,
    newPassForm: HTMLFormElement,
    emailInput: HTMLInputElement
  ): void {
    this.isLoading = true;
    this.errMsg = '';
    const code = this.resetCodeForm.value;
    this._AuthService.resetCode(code).subscribe({
      next: (response) => {
        if (response.status == 'Success') {
          this.isLoading = false;
          this._Renderer2.removeClass(newPassForm, 'd-none');
          this._Renderer2.addClass(codeForm, 'd-none');
          this._Renderer2.setAttribute(emailInput, 'disabled', 'true');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message;
      },
    });
  }

  handleNewPasswordForm(): void {
    this.isLoading = true;
    this.errMsg = '';
    const newInfo = this.resetPasswordForm.value;
    newInfo.email = this.userEmail;

    this._AuthService.resetPassword(newInfo).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('_token', response.token);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message;
      },
    });
  }
}
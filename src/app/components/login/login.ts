import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})

export class LoginComponent
implements OnInit, OnDestroy {

  isLoginForm = true;

  loading = false;

  successMessage = '';

  errorMessage = '';

  private apiUrl =
    'https://sportconnect-be.onrender.com/api/auth';

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.actualizeazaFundalul();

  }

  ngOnDestroy(): void {

    document.body.style.backgroundImage = '';

  }

  toggleForm(): void {

    this.clearMessages();

    this.isLoginForm = !this.isLoginForm;

    this.actualizeazaFundalul();

  }

  private actualizeazaFundalul(): void {

    document.body.style.backgroundImage =
      this.isLoginForm
        ? "url('/fundal_fotbal.jpg')"
        : "url('/fundal_bascket.png')";

    document.body.style.backgroundSize = 'cover';

    document.body.style.backgroundPosition = 'center';

    document.body.style.backgroundRepeat = 'no-repeat';

  }

  onLogin(): void {

    this.clearMessages();

    if (!this.loginData.email.trim()) {

      this.showError(
        'Introdu emailul.'
      );

      return;

    }

    if (!this.loginData.password.trim()) {

      this.showError(
        'Introdu parola.'
      );

      return;

    }

    this.loading = true;

    this.http.post(
      `${this.apiUrl}/login`,
      this.loginData
    ).subscribe({

      next: (response: any) => {

        this.loading = false;

        if (
          response &&
          response.token
        ) {

          localStorage.setItem(
            'token',
            response.token
          );

        }

        this.showSuccess(
          'Autentificare reușită!'
        );

        setTimeout(() => {

          this.router.navigate(['/']);

        }, 800);

      },

      error: (err: any) => {

        console.log(err);

        this.loading = false;

        this.showError(
          'Email sau parolă greșită.'
        );

      }

    });

  }

  onRegister(): void {

    this.clearMessages();

    if (
      !this.registerData.firstName.trim()
    ) {

      this.showError(
        'Introdu prenumele.'
      );

      return;

    }

    if (
      !this.registerData.lastName.trim()
    ) {

      this.showError(
        'Introdu numele.'
      );

      return;

    }

    if (
      !this.registerData.email.trim()
    ) {

      this.showError(
        'Introdu emailul.'
      );

      return;

    }

    if (
      this.registerData.password.length < 6
    ) {

      this.showError(
        'Parola trebuie să aibă minim 6 caractere.'
      );

      return;

    }

    this.loading = true;

    this.http.post(
      `${this.apiUrl}/register`,
      this.registerData,
      {
        responseType: 'text'
      }
    ).subscribe({

      next: () => {

        this.loading = false;

        this.showSuccess(
          'Cont creat cu succes!'
        );

        this.registerData = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phoneNumber: ''
        };

        setTimeout(() => {

          this.isLoginForm = true;

          this.actualizeazaFundalul();

          this.cdr.detectChanges();

        }, 1200);

      },

      error: (err: any) => {

        console.log(err);

        this.loading = false;

        this.showError(
          'Înregistrarea a eșuat.'
        );

      }

    });

  }

  private showSuccess(
    message: string
  ): void {

    this.successMessage = message;

    this.errorMessage = '';

    setTimeout(() => {

      this.successMessage = '';

    }, 3500);

  }

  private showError(
    message: string
  ): void {

    this.errorMessage = message;

    this.successMessage = '';

    setTimeout(() => {

      this.errorMessage = '';

    }, 4000);

  }

  private clearMessages(): void {

    this.successMessage = '';

    this.errorMessage = '';

  }

}
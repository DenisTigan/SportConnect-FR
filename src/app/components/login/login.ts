import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Variabilă care controlează dacă suntem pe Login sau Register
  isLoginForm = true;

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css'
})

export class Navbar {

  menuOpen = false;

  constructor(
    private router: Router
  ) {}

  toggleMenu(): void {

    this.menuOpen =
      !this.menuOpen;

  }

  logout(): void {

    localStorage.removeItem('token');

    this.router.navigate([
      '/login'
    ]);

  }

}
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

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

  get isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  toggleMenu(): void {

    this.menuOpen = !this.menuOpen;

  }

  logout(): void {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }

}
import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { UserService } from '../../services/user.service';

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

export class Navbar implements OnInit {

  menuOpen = false;

  isAdmin = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  checkAdmin(): void {
    const token =
      localStorage.getItem('token');

    if (!token) {
      this.isAdmin = false;
      return;
    }

    this.userService.getMe().subscribe({
      next: (user: any) => {
        const role =
          user.role ||
          user.authority ||
          user.userRole ||
          '';

        this.isAdmin =
          role === 'ADMIN' ||
          role === 'ROLE_ADMIN' ||
          role === 'admin';
      },

      error: () => {
        this.isAdmin = false;
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    localStorage.removeItem('token');

    this.isAdmin = false;

    this.router.navigate(['/login']);
  }

}
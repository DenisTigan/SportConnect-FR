import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs';

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
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.checkAdmin();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.checkAdmin();
      });
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  checkAdmin(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.zone.run(() => {
        this.isAdmin = false;
        this.cdr.detectChanges();
      });

      return;
    }

    this.userService.getMe().subscribe({
      next: (user: any) => {
        const role =
          user.role ||
          user.authority ||
          user.userRole ||
          '';

        this.zone.run(() => {
          this.isAdmin =
            role === 'ADMIN' ||
            role === 'ROLE_ADMIN' ||
            role === 'admin';

          this.cdr.detectChanges();
        });
      },

      error: () => {
        this.zone.run(() => {
          this.isAdmin = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    localStorage.removeItem('token');

    this.zone.run(() => {
      this.isAdmin = false;
      this.cdr.detectChanges();
    });

    this.router.navigate(['/login']);
  }
}
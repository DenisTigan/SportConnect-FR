import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Footer
  ],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css'
})
export class MyReservations implements OnInit {

  reservations: any[] = [];
  loading = true;

  constructor(
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;

    this.reservationService.getMyHistory().subscribe({
      next: (data: any[]) => {
        this.zone.run(() => {
          this.reservations = Array.isArray(data) ? data : [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('RESERVATIONS ERROR:', err);

        this.zone.run(() => {
          this.reservations = [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatTime(date: string): string {
    return new Date(date).toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
}
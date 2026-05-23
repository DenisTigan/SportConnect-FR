import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FieldService } from '../../services/field.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-sport-details',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Footer,
    FormsModule
  ],
  templateUrl: './sport-details.html',
  styleUrl: './sport-details.css'
})
export class SportDetails implements OnInit {

  field: any = null;
  loading = true;
  showBooking = false;

  successMessage = '';
  errorMessage = '';

  selectedDate = '';
  selectedHour = '';

  visibleDates: any[] = [];

  bookingData = {
    date: '',
    start: '',
    end: ''
  };

  availableHours: string[] = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];

  blockedHours: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private fieldService: FieldService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.generateDates();

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      console.log('DETAILS ID:', id);

      if (!id) {
        this.loading = false;
        return;
      }

      this.loadField(id);
    });
  }

  generateDates(): void {
    const today = new Date();

    this.visibleDates = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);

      date.setDate(today.getDate() + i);

      const value =
        date.toISOString().split('T')[0];

      this.visibleDates.push({
        value,
        dayName: date.toLocaleDateString('ro-RO', {
          weekday: 'short'
        }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('ro-RO', {
          month: 'short'
        })
      });
    }
  }

  loadField(id: number): void {
    this.loading = true;

    this.fieldService
      .getFieldById(id)
      .subscribe({
        next: (data: any) => {
          console.log('FIELD DETAILS:', data);

          this.zone.run(() => {
            this.field = data;
            this.loading = false;
            this.cdr.detectChanges();
          });
        },

        error: (err: any) => {
          console.log('FIELD DETAILS ERROR:', err);

          this.zone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
        }
      });
  }

  openBooking(): void {
    this.showBooking = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.loadOccupiedHours();
  }

  loadOccupiedHours(): void {
    this.blockedHours = [];
    this.selectedHour = '';

    this.bookingData.start = '';
    this.bookingData.end = '';

    if (!this.field || !this.selectedDate) {
      return;
    }

    this.reservationService
      .getOccupiedReservations(
        this.field.id,
        this.selectedDate
      )
      .subscribe({
        next: (reservations: any[]) => {
          console.log(
            'OCCUPIED RESERVATIONS:',
            reservations
          );

          this.blockedHours =
            reservations.map(reservation =>
              reservation.startTime.substring(11, 16)
            );

          console.log(
            'BLOCKED HOURS:',
            this.blockedHours
          );

          this.cdr.detectChanges();
        },

        error: (err: any) => {
          console.log('OCCUPIED ERROR:', err);
        }
      });
  }

  selectHour(hour: string): void {
    if (this.isBlocked(hour)) {
      return;
    }

    this.selectedHour = hour;
    this.bookingData.start = hour;

    const nextHour =
      Number(hour.split(':')[0]) + 1;

    this.bookingData.end =
      `${nextHour.toString().padStart(2, '0')}:00`;
  }

  isBlocked(hour: string): boolean {
    return this.blockedHours.includes(hour);
  }

  confirmReservation(): void {
    console.log('BUTON APASAT');

    this.successMessage = '';
    this.errorMessage = '';

    this.bookingData.date = this.selectedDate;

    if (!this.field) {
      this.errorMessage =
        'Terenul nu este încărcat.';
      return;
    }

    if (
      !this.bookingData.date ||
      !this.bookingData.start ||
      !this.bookingData.end
    ) {
      this.errorMessage =
        'Alege data și ora rezervării.';
      return;
    }

    const startTime =
      `${this.bookingData.date}T${this.bookingData.start}:00`;

    const endTime =
      `${this.bookingData.date}T${this.bookingData.end}:00`;

    const reservation = {
      fieldId: this.field.id,
      startTime,
      endTime
    };

    console.log('RESERVATION PAYLOAD:', reservation);

    this.reservationService
      .createReservation(reservation)
      .subscribe({
        next: (res: any) => {
          console.log(
            'RESERVATION RESPONSE:',
            res
          );

          this.zone.run(() => {
            this.successMessage =
              'Rezervarea a fost creată cu succes!';

            this.errorMessage = '';

            this.showBooking = false;

            this.selectedDate = '';
            this.selectedHour = '';

            this.bookingData = {
              date: '',
              start: '',
              end: ''
            };

            this.blockedHours = [];

            this.cdr.detectChanges();
          });
        },

        error: (err: any) => {
          console.log(
            'RESERVATION ERROR:',
            err
          );

          this.zone.run(() => {
            this.errorMessage =
              'Rezervarea a eșuat. Verifică intervalul ales.';

            this.successMessage = '';

            this.cdr.detectChanges();
          });
        }
      });
  }
}
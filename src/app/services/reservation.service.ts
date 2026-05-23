import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl =
    'https://sportconnect-be.onrender.com/api/reservations';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders() {
    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  createReservation(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create`,
      data,
      this.getHeaders()
    );
  }

  getOccupiedReservations(
    fieldId: number,
    date: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/occupied?fieldId=${fieldId}&date=${date}`,
      this.getHeaders()
    );
  }

  getMyHistory(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my-history`,
      this.getHeaders()
    );
  }
}
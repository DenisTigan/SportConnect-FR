import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private apiUrl =
    'https://sportconnect-be.onrender.com/api/partner-requests';

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

  submitRequest(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/submit`,
      data,
      this.getHeaders()
    );
  }

  getPendingRequests(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/pending`,
      this.getHeaders()
    );
  }

  approveRequest(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/approve/${id}`,
      {},
      {
        ...this.getHeaders(),
        responseType: 'text'
      }
    );
  }

  rejectRequest(id: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reject/${id}`,
      {},
      {
        ...this.getHeaders(),
        responseType: 'text'
      }
    );
  }

}
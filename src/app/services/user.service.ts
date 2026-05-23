import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl =
    'https://sportconnect-be.onrender.com/api/users';

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

  getMe(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/me`,
      this.getHeaders()
    );

  }

  updateProfile(data: any): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/me`,
      data,
      this.getHeaders()
    );

  }

  changePassword(data: any): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/me/change-password`,
      data,
      this.getHeaders()
    );

  }

}
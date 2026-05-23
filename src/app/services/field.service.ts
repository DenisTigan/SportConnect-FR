import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private apiUrl =
    'https://sportconnect-be.onrender.com/api/fields';

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

  getFieldsByCategory(category: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/category/${category}`,
      this.getHeaders()
    );
  }

  getFieldById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }
}
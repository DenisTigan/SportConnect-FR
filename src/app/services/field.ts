import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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

  getFieldsByCategory(
    category: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/category/${category}`
    );

  }

  getFieldById(
    id: number
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${id}`
    );

  }

}
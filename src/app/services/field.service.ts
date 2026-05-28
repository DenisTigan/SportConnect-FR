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

  getAllFields(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/all`,
      this.getHeaders()
    );
  }

  addField(
    fieldDetails: any,
    image: File | null
  ): Observable<any> {
    const formData = new FormData();

    formData.append(
      'fieldDetails',
      new Blob(
        [
          JSON.stringify(fieldDetails)
        ],
        {
          type: 'application/json'
        }
      )
    );

    if (image) {
      formData.append(
        'image',
        image
      );
    }

    return this.http.post(
      `${this.apiUrl}/add`,
      formData,
      this.getHeaders()
    );
  }

  updateField(
    id: number,
    fieldDetails: any,
    image: File | null
  ): Observable<any> {
    const formData = new FormData();

    formData.append(
      'fieldDetails',
      new Blob(
        [
          JSON.stringify(fieldDetails)
        ],
        {
          type: 'application/json'
        }
      )
    );

    if (image) {
      formData.append(
        'image',
        image
      );
    }

    return this.http.put(
      `${this.apiUrl}/update/${id}`,
      formData,
      {
        ...this.getHeaders(),
        responseType: 'text'
      }
    );
  }

  deleteField(
    id: number
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      {
        ...this.getHeaders(),
        responseType: 'text'
      }
    );
  }

}
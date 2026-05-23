import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

  searchTerm = '';
  allFields: any[] = [];
  errorMessage = '';

  constructor(
    private fieldService: FieldService,
    private router: Router
  ) {
    this.loadFields();
  }

  loadFields(): void {
    this.fieldService.getAllFields().subscribe({
      next: (data: any) => {
        this.allFields = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  searchField(): void {
    this.errorMessage = '';

    const term = this.searchTerm.trim();

    if (!term) {
      this.errorMessage = 'Scrie numele unui teren.';
      return;
    }

    this.router.navigate(
      ['/sport/search'],
      {
        queryParams: {
          q: term
        }
      }
    );
  }
}
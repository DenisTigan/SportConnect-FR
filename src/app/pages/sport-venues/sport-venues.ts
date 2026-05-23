import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-sport-venues',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './sport-venues.html',
  styleUrl: './sport-venues.css'
})
export class SportVenues implements OnInit {

  category = '';
  fields: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private fieldService: FieldService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';

      console.log('CATEGORY:', this.category);

      if (this.category) {
        this.loadFields();
      }
    });
  }

  loadFields(): void {
    this.loading = true;
    this.fields = [];

    this.fieldService.getFieldsByCategory(this.category).subscribe({
      next: (data: any) => {
        console.log('FIELDS FROM BACKEND:', data);

        this.zone.run(() => {
          this.fields = Array.isArray(data) ? data : [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('EROARE BACKEND:', err);

        this.zone.run(() => {
          this.loading = false;
          this.fields = [];
          this.cdr.detectChanges();
        });
      }
    });
  }
}
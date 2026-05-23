import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

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
  searchTerm = '';

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

      this.route.queryParamMap.subscribe(query => {
        this.searchTerm = query.get('q') || '';

        if (this.searchTerm) {
          this.loadSearchResults();
        } else if (this.category) {
          this.loadFieldsByCategory();
        } else {
          this.loading = false;
        }
      });
    });
  }

  loadFieldsByCategory(): void {
    this.loading = true;
    this.fields = [];

    this.fieldService.getFieldsByCategory(this.category).subscribe({
      next: (data: any) => {
        this.zone.run(() => {
          this.fields = Array.isArray(data) ? data : [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('CATEGORY ERROR:', err);

        this.zone.run(() => {
          this.fields = [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  loadSearchResults(): void {
    this.loading = true;
    this.fields = [];

    this.fieldService.getAllFields().subscribe({
      next: (data: any) => {
        const term = this.searchTerm.toLowerCase();

        this.zone.run(() => {
          this.fields = data.filter((field: any) =>
            field.name.toLowerCase().includes(term)
          );

          this.loading = false;
          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('SEARCH ERROR:', err);

        this.zone.run(() => {
          this.fields = [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

}
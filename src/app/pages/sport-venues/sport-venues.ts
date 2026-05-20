import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Navbar }
from '../../components/navbar/navbar';

import { Footer }
from '../../components/footer/footer';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { FieldService }
from '../../services/field';

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

export class SportVenues
implements OnInit {

  category = '';

  filteredVenues: any[] = [];

  constructor(

    private route: ActivatedRoute,

    private fieldService: FieldService

  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.category =
        params['category'];

      this.loadFields();

    });

  }

  loadFields() {

    this.fieldService
      .getFieldsByCategory(this.category)
      .subscribe({

        next: (data: any) => {

          this.filteredVenues = data;

          console.log(data);

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

}
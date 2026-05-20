import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {

      categories = [

    {
      name: 'Football',
      slug: 'Fotbal',
      image: 'football.jpg'
    },

    {
      name: 'Tennis',
      slug: 'Tenis',
      image: 'hero.jpg'
    },

    {
      name: 'Basketball',
      slug: 'Baschet',
      image: 'venue1.jpg'
    },

    {
      name: 'Volleyball',
      slug: 'Volei',
      image: 'venue2.jpg'
    },

    {
      name: 'Padel',
      slug: 'Padel',
      image: 'venue3.jpg'
    }

  ];
}
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
      image: 'tennis.jpg'
    },

    {
      name: 'Basketball',
      slug: 'Baschet',
      image: 'basketball.jpg'
    },

    {
      name: 'Volleyball',
      slug: 'Volei',
      image: 'volleyball.jpg'
    },

    {
      name: 'Padel',
      slug: 'Padel',
      image: 'padel.jpg'
    }

  ];
}
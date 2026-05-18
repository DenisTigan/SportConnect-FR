import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {

  categories = [

    {
      name: 'Football',
      image: 'football.jpg'
    },

    {
      name: 'Tennis',
      image: 'venue1.jpg'
    },

    {
      name: 'Basketball',
      image: 'venue2.jpg'
    },

    {
      name: 'Volleyball',
      image: 'venue3.jpg'
    },

    {
      name: 'Padel',
      image: 'hero.jpg'
    }

  ];
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venues.html',
  styleUrl: './venues.css'
})
export class Venues {

 venues = [
  {
    name: 'Salca Sports Center',
    city: 'Oradea',
    price: 50,
    rating: 4.9,
    sport: 'Football',
    img: 'venue1.jpg'
  },
  {
    name: 'Arena Pro',
    city: 'Cluj',
    price: 70,
    rating: 4.8,
    sport: 'Padel',
    img: 'venue2.jpg'
  },
  {
    name: 'Sport Hub',
    city: 'București',
    price: 60,
    rating: 5.0,
    sport: 'Basketball',
    img: 'venue3.jpg'
  }
];

}
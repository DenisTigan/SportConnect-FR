import { Component } from '@angular/core';

import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { Categories } from '../../components/categories/categories';
import { Carousel } from '../../components/carousel/carousel';
import { Venues } from '../../components/venues/venues';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',

  standalone: true,

  imports: [
    Navbar,
    Hero,
    Categories,
    Carousel,
    Venues,
    Footer
  ],

  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {

}
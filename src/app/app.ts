import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Categories } from './components/categories/categories';
import { Venues } from './components/venues/venues';
import { Footer } from './components/footer/footer';
import { Carousel } from './components/carousel/carousel';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, Categories, Venues, Carousel, Footer],
  templateUrl: './app.html',
})
export class App {}
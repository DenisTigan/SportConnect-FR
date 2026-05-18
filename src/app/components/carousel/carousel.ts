import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel implements OnInit, OnDestroy {

  currentIndex = 0;

  autoPlayInterval: any;

  touchStartX = 0;
  touchEndX = 0;

  images = [
    'hero.jpg',
    'football.jpg',
    'padel.jpg',
    'basketball.jpg',
    'tennis.jpg',
    'volleyball.jpg'
  ];

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.startAutoplay();

  }

  ngOnDestroy(): void {

    clearInterval(this.autoPlayInterval);

  }

  /* AUTOPLAY */
  startAutoplay() {

    clearInterval(this.autoPlayInterval);

    this.autoPlayInterval = setInterval(() => {

      this.currentIndex++;

      if (this.currentIndex >= this.images.length) {
        this.currentIndex = 0;
      }

      /* FORCE UPDATE UI */
      this.cdr.detectChanges();

    }, 4000);

  }

  /* NEXT */
  nextSlide() {

    this.currentIndex++;

    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    }

    this.startAutoplay();

  }

  /* PREV */
  prevSlide() {

    this.currentIndex--;

    if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1;
    }

    this.startAutoplay();

  }

  /* DOTS */
  goToSlide(index: number) {

    this.currentIndex = index;

    this.startAutoplay();

  }

  /* SWIPE */
  onTouchStart(event: TouchEvent) {

    this.touchStartX =
      event.changedTouches[0].screenX;

  }

  onTouchEnd(event: TouchEvent) {

    this.touchEndX =
      event.changedTouches[0].screenX;

    if (this.touchEndX < this.touchStartX - 50) {
      this.nextSlide();
    }

    if (this.touchEndX > this.touchStartX + 50) {
      this.prevSlide();
    }

  }

}
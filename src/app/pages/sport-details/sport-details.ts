import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { DetailsHeader } from '../../components/details-header/details-header';

import { DetailsFooter } from '../../components/details-footer/details-footer';

@Component({
  selector: 'app-sport-details',

  standalone: true,

  imports: [
    CommonModule,
    DetailsHeader,
    DetailsFooter
  ],

  templateUrl: './sport-details.html',

  styleUrl: './sport-details.css'
})

export class SportDetails implements OnInit {

  venueId = 0;

  sportData: any;

  venues = [

    {
      id: 1,
      sport: 'football',
      title: 'Arena One',
      description:'Premium football venue with modern facilities and professional turf.',
      image: 'FotbalTeren1.jpg',
      secondaryImage: 'FotbalTeren1.jpg',
      price: 80
    },
    {
      id: 2,
      sport: 'football',
      title: 'Champions Field',
      description:'Elite football experience designed for competitive matches.',
      image: 'FotbalTeren2.jpg',
      secondaryImage: 'FotbalTeren2.jpg',
      price: 60
    },
    {
      id: 3,
      sport: 'football',
      title: 'Elite Stadium',
      description:'Modern stadium with premium atmosphere and quality services.',
      image: 'FotbalTeren3.jpg',
      secondaryImage: 'FotbalTeren3.jpg',
      price: 75
    },


    {
      id: 4,
      sport: 'tennis',
      title: 'Tennis Play',
      description:'Premium tennis venue with modern facilities and professional turf.',
      image: 'TenisTeren1.jpg',
      secondaryImage: 'TenisTeren1.jpg',
      price: 50
    },
    {
      id: 5,
      sport: 'tennis',
      title: 'Tennis',
      description:'Elite tennis experience designed for competitive matches.',
      image: 'TenisTeren2.jpg',
      secondaryImage: 'TenisTeren2.jpg',
      price: 30
    },
    {
      id: 6,
      sport: 'tennis',
      title: 'Salca Tennis',
      description:'Modern stadium with premium atmosphere and quality services.',
      image: 'TenisTeren3.jpg',
      secondaryImage: 'TenisTeren3.jpg',
      price: 60
    },


    {
      id: 7,
      sport: 'basketball',
      title: 'Baschet LPS',
      description:'Premium basketball venue with modern facilities and professional turf.',
      image: 'BaschetTeren1.jpg',
      secondaryImage: 'BaschetTeren1.jpg',
      price: 80
    },
    {
      id: 8,
      sport: 'basketball',
      title: 'Baschet CSM',
      description:'Elite basketball experience designed for competitive matches.',
      image: 'BaschetTeren2.jpg',
      secondaryImage: 'BaschetTeren2.jpg',
      price: 65
    },
    {
      id: 9,
      sport: 'basketball',
      title: 'Baschet Sport',
      description:'Modern stadium with premium atmosphere and quality services.',
      image: 'BaschetTeren3.jpg',
      secondaryImage: 'BaschetTeren3.jpg',
      price: 75
    },


    {
      id: 10,
      sport: 'volleyball',
      title: 'Volei Top',
      description:'Premium volleyball venue with modern facilities and professional turf.',
      image: 'VoleiTeren1.jpg',
      secondaryImage: 'VoleiTeren1.jpg',
      price: 55
    },
    {
      id: 11,
      sport: 'volleyball',
      title: 'Volei Play',
      description:'Elite volleyball experience designed for competitive matches.',
      image: 'VoleiTeren2.jpg',
      secondaryImage: 'VoleiTeren2.jpg',
      price: 40
    },
    {
      id: 12,
      sport: 'volleyball',
      title: 'Volei Sport',
      description:'Modern stadium with premium atmosphere and quality services.',
      image: 'VoleiTeren3.jpg',
      secondaryImage: 'VoleiTeren3.jpg',
      price: 60
    },


    {
      id: 13,
      sport: 'padel',
      title: 'Padel Top',
      description:'Professional padel courts with modern surfaces.',
      image: 'PadelTeren1.jpg',
      secondaryImage: 'PadelTeren1.jpg',
      price: 90
    },
    {
      id: 14,
      sport: 'padel',
      title: 'Padel Sport',
      description:'Professional padel courts with modern surfaces.',
      image: 'PadelTeren2.jpg',
      secondaryImage: 'PadelTeren2.jpg',
      price: 80
    },
    {
      id: 15,
      sport: 'padel',
      title: 'Padel Arena',
      description:'Premium indoor padel courts with luxury facilities.',
      image: 'PadelTeren3.jpg',
      secondaryImage: 'PadelTeren3.jpg',
      price: 70
    }

  ];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.venueId =
        Number(params['id']);

      this.sportData =
        this.venues.find(
          venue => venue.id === this.venueId
        );

    });

  }

}
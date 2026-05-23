import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Navbar } from '../../components/navbar/navbar';

import { Footer } from '../../components/footer/footer';

import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-partner',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Footer
  ],

  templateUrl: './partner.html',

  styleUrl: './partner.css'
})

export class Partner {

  loading = false;

  successMessage = '';

  errorMessage = '';

  partnerData = {
    businessName: '',
    phoneNumber: '',
    city: '',
    address: '',
    sportCategory: '',
    message: ''
  };

  constructor(
    private partnerService: PartnerService
  ) {}

  submitPartnerRequest(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.partnerData.businessName.trim()) {
      this.errorMessage =
        'Business name is required.';
      return;
    }

    if (!this.partnerData.phoneNumber.trim()) {
      this.errorMessage =
        'Phone number is required.';
      return;
    }

    if (!this.partnerData.city.trim()) {
      this.errorMessage =
        'City is required.';
      return;
    }

    if (!this.partnerData.address.trim()) {
      this.errorMessage =
        'Address is required.';
      return;
    }

    if (!this.partnerData.sportCategory.trim()) {
      this.errorMessage =
        'Sport category is required.';
      return;
    }

    this.loading = true;

    this.partnerService
      .submitRequest(this.partnerData)
      .subscribe({

        next: (res: any) => {

          console.log(
            'PARTNER REQUEST:',
            res
          );

          this.loading = false;

          this.successMessage =
            'Partner request submitted successfully!';

          this.errorMessage = '';

          this.partnerData = {
            businessName: '',
            phoneNumber: '',
            city: '',
            address: '',
            sportCategory: '',
            message: ''
          };

          setTimeout(() => {
            this.successMessage = '';
          }, 4000);

        },

        error: (err: any) => {

          console.log(
            'PARTNER REQUEST ERROR:',
            err
          );

          this.loading = false;

          this.errorMessage =
            'Could not submit partner request. Please try again.';

          this.successMessage = '';

          setTimeout(() => {
            this.errorMessage = '';
          }, 4000);

        }

      });

  }

}
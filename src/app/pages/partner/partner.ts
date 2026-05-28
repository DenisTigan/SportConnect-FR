import {
  Component,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

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
    private partnerService: PartnerService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  submitPartnerRequest(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.partnerData.businessName.trim()) {
      this.showError('Business name is required.');
      return;
    }

    if (!this.partnerData.phoneNumber.trim()) {
      this.showError('Phone number is required.');
      return;
    }

    if (!this.partnerData.city.trim()) {
      this.showError('City is required.');
      return;
    }

    if (!this.partnerData.address.trim()) {
      this.showError('Address is required.');
      return;
    }

    if (!this.partnerData.sportCategory.trim()) {
      this.showError('Sport category is required.');
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

          this.zone.run(() => {

            this.loading = false;

            this.successMessage =
              'Cererea ta a fost trimisă cu succes!';

            this.errorMessage = '';

            this.partnerData = {
              businessName: '',
              phoneNumber: '',
              city: '',
              address: '',
              sportCategory: '',
              message: ''
            };

            this.cdr.detectChanges();

            setTimeout(() => {
              this.successMessage = '';
              this.cdr.detectChanges();
            }, 4000);

          });

        },

        error: (err: any) => {

          console.log(
            'PARTNER REQUEST ERROR:',
            err
          );

          this.zone.run(() => {

            this.loading = false;

            if (
              err.status === 200 ||
              err.status === 201
            ) {

              this.successMessage =
                'Cererea ta a fost trimisă cu succes!';

              this.errorMessage = '';

              this.partnerData = {
                businessName: '',
                phoneNumber: '',
                city: '',
                address: '',
                sportCategory: '',
                message: ''
              };

            } else {

              this.errorMessage =
                'Cererea nu a putut fi trimisă. Încearcă din nou.';

              this.successMessage = '';

            }

            this.cdr.detectChanges();

            setTimeout(() => {
              this.errorMessage = '';
              this.successMessage = '';
              this.cdr.detectChanges();
            }, 4000);

          });

        }

      });

  }

  showError(message: string): void {

    this.errorMessage = message;

    this.successMessage = '';

    this.cdr.detectChanges();

    setTimeout(() => {
      this.errorMessage = '';
      this.cdr.detectChanges();
    }, 4000);

  }

}
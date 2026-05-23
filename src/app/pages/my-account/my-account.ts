import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Navbar }
from '../../components/navbar/navbar';

import { Footer }
from '../../components/footer/footer';

import { UserService }
from '../../services/user.service';

@Component({
  selector: 'app-my-account',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Footer
  ],

  templateUrl: './my-account.html',

  styleUrl: './my-account.css'
})

export class MyAccount implements OnInit {

  user: any = null;

  loading = true;

  successMessage = '';

  errorMessage = '';

  profileData = {

    firstName: '',
    lastName: '',
    phoneNumber: ''

  };

  passwordData = {

    currentPassword: '',

    newPassword: '',

    confirmNewPassword: ''

  };

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.userService
      .getMe()
      .subscribe({

        next: (data: any) => {

          console.log('USER:', data);

          this.user = data;

          this.profileData = {

            firstName:
              data.firstName,

            lastName:
              data.lastName,

            phoneNumber:
              data.phoneNumber

          };

          this.loading = false;

        },

        error: (err: any) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  saveProfile(): void {

    this.successMessage = '';
    this.errorMessage = '';

    this.userService
      .updateProfile(this.profileData)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.successMessage =
            'Profil actualizat cu succes!';

        },

        error: (err: any) => {

          console.log(err);

          this.errorMessage =
            'Actualizarea profilului a eșuat.';

        }

      });

  }

  updatePassword(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (
      this.passwordData.newPassword !==
      this.passwordData.confirmNewPassword
    ) {

      this.errorMessage =
        'Parolele noi nu coincid.';

      return;

    }

    this.userService
      .changePassword(this.passwordData)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.successMessage =
            'Parola a fost schimbată!';

          this.passwordData = {

            currentPassword: '',

            newPassword: '',

            confirmNewPassword: ''

          };

        },

        error: (err: any) => {

          console.log(err);

          this.errorMessage =
            'Schimbarea parolei a eșuat.';

        }

      });

  }

}
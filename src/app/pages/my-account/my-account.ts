import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { UserService } from '../../services/user.service';

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
  savingProfile = false;
  savingPassword = false;

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
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.loading = true;

    this.userService.getMe().subscribe({
      next: (data: any) => {
        this.zone.run(() => {
          this.user = data;

          this.profileData = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phoneNumber: data.phoneNumber || ''
          };

          this.loading = false;
          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('USER ERROR:', err);

        this.zone.run(() => {
          this.loading = false;
          this.showError('Could not load account details.');
          this.cdr.detectChanges();
        });
      }
    });
  }

  saveProfile(): void {
    this.clearMessages();

    if (!this.profileData.firstName.trim()) {
      this.showError('First name is required.');
      return;
    }

    if (!this.profileData.lastName.trim()) {
      this.showError('Last name is required.');
      return;
    }

    if (!this.profileData.phoneNumber.trim()) {
      this.showError('Phone number is required.');
      return;
    }

    if (!/^[0-9+\s-]{8,15}$/.test(this.profileData.phoneNumber)) {
      this.showError('Phone number is not valid.');
      return;
    }

    this.savingProfile = true;

    this.userService.updateProfile(this.profileData).subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.savingProfile = false;

          this.showSuccess('Profile updated successfully.');

          this.loadUser();

          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('PROFILE UPDATE ERROR:', err);

        this.zone.run(() => {
          this.savingProfile = false;
          this.showError('Profile update failed.');
          this.cdr.detectChanges();
        });
      }
    });
  }

  updatePassword(): void {
    this.clearMessages();

    if (!this.passwordData.currentPassword) {
      this.showError('Current password is required.');
      return;
    }

    if (!this.passwordData.newPassword) {
      this.showError('New password is required.');
      return;
    }

    if (this.passwordData.newPassword.length < 6) {
      this.showError('New password must have at least 6 characters.');
      return;
    }

    if (
      this.passwordData.newPassword !==
      this.passwordData.confirmNewPassword
    ) {
      this.showError('New passwords do not match.');
      return;
    }

    this.savingPassword = true;

    this.userService.changePassword(this.passwordData).subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.savingPassword = false;

          this.passwordData = {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          };

          this.showSuccess('Password changed successfully.');

          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('PASSWORD ERROR:', err);

        this.zone.run(() => {
          this.savingPassword = false;

          if (err.status === 400) {
            this.showError('Current password is wrong or the new password is invalid.');
          } else {
            this.showError('Password change failed.');
          }

          this.cdr.detectChanges();
        });
      }
    });
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';

    setTimeout(() => {
      this.successMessage = '';
      this.cdr.detectChanges();
    }, 3500);
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';

    setTimeout(() => {
      this.errorMessage = '';
      this.cdr.detectChanges();
    }, 4000);
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

}
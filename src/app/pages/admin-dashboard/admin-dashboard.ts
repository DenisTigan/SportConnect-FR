import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

import { FieldService } from '../../services/field.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Footer
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  loading = true;
  saving = false;
  isAdmin = false;

  fields: any[] = [];

  editingFieldId: number | null = null;
  selectedImage: File | null = null;

  successMessage = '';
  errorMessage = '';

  showDeleteModal = false;
  fieldToDelete: any = null;

  fieldForm = {
    name: '',
    address: '',
    category: '',
    pricePerHour: 0,
    phoneNumber: '',
    description: '',
    hasLighting: false,
    isIndoor: false,
    openTime: '08:00:00',
    closeTime: '23:00:00'
  };

  constructor(
    private fieldService: FieldService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
  }

  checkAdmin(): void {
    this.userService.getMe().subscribe({
      next: (user: any) => {
        const role =
          user.role ||
          user.authority ||
          user.userRole ||
          '';

        if (
          role !== 'ADMIN' &&
          role !== 'ROLE_ADMIN' &&
          role !== 'admin'
        ) {
          this.router.navigate(['/']);
          return;
        }

        this.zone.run(() => {
          this.isAdmin = true;
          this.loadFields();
          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('ADMIN CHECK ERROR:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  loadFields(
    showPageLoading: boolean = true
  ): void {

    if (showPageLoading) {
      this.loading = true;
    }

    this.fieldService
      .getAllFields()
      .subscribe({

        next: (data: any[]) => {

          this.zone.run(() => {

            this.fields =
              Array.isArray(data) ? data : [];

            this.loading = false;

            this.cdr.detectChanges();

          });

        },

        error: (err: any) => {

          console.log(
            'FIELDS ERROR:',
            err
          );

          this.zone.run(() => {

            this.loading = false;

            this.showError(
              'Could not load fields.'
            );

            this.cdr.detectChanges();

          });

        }

      });

  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;
    }
  }

  saveField(): void {
    this.clearMessages();

    if (!this.fieldForm.name.trim()) {
      this.showError('Field name is required.');
      return;
    }

    if (!this.fieldForm.address.trim()) {
      this.showError('Address is required.');
      return;
    }

    if (!this.fieldForm.category.trim()) {
      this.showError('Category is required.');
      return;
    }

    if (
      !this.fieldForm.pricePerHour ||
      this.fieldForm.pricePerHour <= 0
    ) {
      this.showError('Price must be greater than 0.');
      return;
    }

    this.saving = true;

    const fieldDetails = {
      ...this.fieldForm
    };

    const request = this.editingFieldId
      ? this.fieldService.updateField(
          this.editingFieldId,
          fieldDetails,
          this.selectedImage
        )
      : this.fieldService.addField(
          fieldDetails,
          this.selectedImage
        );

    request.subscribe({
      next: (res: any) => {
        console.log('SAVE FIELD RESPONSE:', res);

        this.zone.run(() => {
          this.saving = false;

          this.showSuccess(
            this.editingFieldId
              ? 'Field updated successfully!'
              : 'Field added successfully!'
          );

          this.resetForm();
          this.loadFields(false);
          this.cdr.detectChanges();
        });
      },

      error: (err: any) => {
        console.log('SAVE FIELD ERROR FULL:', err);
        console.log('STATUS:', err.status);
        console.log('ERROR BODY:', err.error);

        this.zone.run(() => {
          this.saving = false;
          this.showError('Could not save field.');
          this.cdr.detectChanges();
        });
      }
    });
  }

  editField(field: any): void {
    this.editingFieldId = field.id;

    this.fieldForm = {
      name: field.name || '',
      address: field.address || '',
      category: field.category || '',
      pricePerHour: field.pricePerHour || 0,
      phoneNumber: field.phoneNumber || '',
      description: field.description || '',
      hasLighting: !!field.hasLighting,
      isIndoor: !!field.isIndoor,
      openTime: this.normalizeTime(field.openTime || '08:00:00'),
      closeTime: this.normalizeTime(field.closeTime || '23:00:00')
    };

    this.selectedImage = null;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  openDeleteModal(field: any): void {
    this.fieldToDelete = field;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (!this.fieldToDelete) {
      return;
    }

    this.fieldService
      .deleteField(this.fieldToDelete.id)
      .subscribe({
        next: (res: any) => {
          console.log('DELETE RESPONSE:', res);

          this.zone.run(() => {
            this.showDeleteModal = false;
            this.fieldToDelete = null;

            this.showSuccess('Field deleted successfully.');

            this.loadFields(false);
            this.cdr.detectChanges();
          });
        },

        error: (err: any) => {
          console.log('DELETE ERROR FULL:', err);
          console.log('STATUS:', err.status);
          console.log('ERROR BODY:', err.error);

          this.zone.run(() => {
            this.showDeleteModal = false;
            this.fieldToDelete = null;

            this.showError('Could not delete field.');

            this.cdr.detectChanges();
          });
        }
      });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.fieldToDelete = null;
  }

  resetForm(): void {
    this.editingFieldId = null;
    this.selectedImage = null;

    this.fieldForm = {
      name: '',
      address: '',
      category: '',
      pricePerHour: 0,
      phoneNumber: '',
      description: '',
      hasLighting: false,
      isIndoor: false,
      openTime: '08:00:00',
      closeTime: '23:00:00'
    };
  }

  normalizeTime(value: any): string {
    if (typeof value === 'string') {
      return value.length === 5
        ? `${value}:00`
        : value;
    }

    if (value && typeof value === 'object') {
      const hour =
        value.hour?.toString().padStart(2, '0') || '08';

      const minute =
        value.minute?.toString().padStart(2, '0') || '00';

      return `${hour}:${minute}:00`;
    }

    return '08:00:00';
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
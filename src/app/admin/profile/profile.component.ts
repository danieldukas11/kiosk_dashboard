import {Component, OnInit} from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageUsersService} from '../../services/manage-users.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mu: ManageUsersService,
    private toastr: ToastrService
  ) {
    this.profileForm = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userData = jwtDecode(localStorage.getItem('usr'));
    this.profileForm.patchValue(this.userData);
  }

  get firstNameCtrl(): AbstractControl {
    return this.profileForm.get('first_name');
  }

  get lastNameCtrl(): AbstractControl {
    return this.profileForm.get('last_name');
  }

  get emailCtrl(): AbstractControl {
    return this.profileForm.get('email');
  }

  saveInfo() {
    if (this.profileForm.valid) {
      this.mu.updateProfile(this.profileForm.value).subscribe(() => {
        this.toastr.success('Profile info has been updated successfully updated');
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoreService } from '../../shared/services/store.service';
import { ADMIN_INFO } from '../../shared/models/admin-info';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private storeService: StoreService
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get usernameControl() {
    return this.form.controls['username'] as FormControl;
  }

  get passwordControl() {
    return this.form.controls['password'] as FormControl;
  }

  ngOnInit(): void {}

  save() {
    if (this.form.valid) {
      if (
        this.form.value.username === ADMIN_INFO.username &&
        this.form.value.password === ADMIN_INFO.password
      ) {
        this.storeService.adminInfo.next(this.form.value);
        this.utilityService.navigate('admin/dashboard');
      }
    }
  }
}

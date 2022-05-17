import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[MaterialModule,LoginComponent, ForgotPasswordComponent, ChangePasswordComponent]
})
export class LandingModule { }

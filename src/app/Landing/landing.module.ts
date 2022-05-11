import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent,RegistrationComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[MaterialModule,LoginComponent, ForgotPasswordComponent,RegistrationComponent, ChangePasswordComponent]
})
export class LandingModule { }

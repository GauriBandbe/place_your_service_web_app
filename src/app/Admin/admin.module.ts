import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSharedModule } from './Shared/admin-shared.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [   
  ],
  imports: [
    CommonModule,
    AdminSharedModule,
    AdminAuthModule
  ],
  exports:[AdminSharedModule,AdminAuthModule],
  providers:[ToastrService]
})
export class AdminModule { }

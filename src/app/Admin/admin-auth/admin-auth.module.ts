import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import { AdminSharedModule } from '../Shared/admin-shared.module';
import { AdminDashboardComponent } from '../Pages/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from '../Pages/user-list/user-list.component';
import { AllergyComponent } from '../Pages/Data-Modal/allergy/allergy.component';
import { AllergyDataComponent } from '../Pages/Data-Management/allergy-data/allergy-data.component';
import { DiagnosisComponent } from '../Pages/Data-Modal/diagnosis/diagnosis.component';
import { DiagnosisDataComponent } from '../Pages/Data-Management/diagnosis-data/diagnosis-data.component';
import { MedicationComponent } from '../Pages/Data-Modal/medication/medication.component';
import { MedicationDataComponent } from '../Pages/Data-Management/medication-data/medication-data.component';
import { ProcedureComponent } from '../Pages/Data-Modal/procedure/procedure.component';
import { ProcedureDataComponent } from '../Pages/Data-Management/procedure-data/procedure-data.component';
import { UserDetailsComponent } from '../Pages/user-details/user-details.component';
import { TechnicianListComponent } from '../Pages/technician-list/technician-list.component';
import { AddTechnicianComponent } from '../Pages/add-technician/add-technician.component';
import { AddVendorComponent } from '../Pages/add-vendor/add-vendor.component';
import { VendorListComponent } from '../Pages/vendor-list/vendor-list.component';
import { AddVendorUserComponent } from '../Pages/add-vendor-user/add-vendor-user.component';
import { VendorUserListComponent } from '../Pages/vendor-user-list/vendor-user-list.component';
import { VendorServicesComponent } from '../Pages/vendor-services/vendor-services.component';

@NgModule({
  declarations: [
    AdminAuthComponent,
    AdminDashboardComponent,
    UserListComponent,
    DiagnosisDataComponent, MedicationDataComponent, AllergyDataComponent, ProcedureDataComponent,
    AllergyComponent, DiagnosisComponent, MedicationComponent, ProcedureComponent,   
    UserDetailsComponent,
    TechnicianListComponent,
    AddTechnicianComponent,
    VendorListComponent,
    AddVendorComponent,
    AddVendorUserComponent,
    VendorUserListComponent,
    VendorServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminAuthRoutingModule,
    AdminSharedModule,
    MaterialModule
  ],
  exports:[
    AdminAuthComponent,
    AdminDashboardComponent,
    UserListComponent,
    DiagnosisDataComponent, MedicationDataComponent, AllergyDataComponent, ProcedureDataComponent,
    AllergyComponent, DiagnosisComponent, MedicationComponent, ProcedureComponent,
    TechnicianListComponent,AddTechnicianComponent,VendorListComponent,AddVendorComponent,
    AddVendorUserComponent,VendorUserListComponent,VendorServicesComponent]
})
export class AdminAuthModule { }

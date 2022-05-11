import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import { AdminSharedModule } from '../Shared/admin-shared.module';
import { AdminDashboardComponent } from '../Pages/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from '../Pages/user-list/user-list.component';
import { HospitalRegistrationComponent } from '../Pages/hospital-registration/hospital-registration.component';
import { AllergyComponent } from '../Pages/Data-Modal/allergy/allergy.component';
import { AllergyDataComponent } from '../Pages/Data-Management/allergy-data/allergy-data.component';
import { DiagnosisComponent } from '../Pages/Data-Modal/diagnosis/diagnosis.component';
import { DiagnosisDataComponent } from '../Pages/Data-Management/diagnosis-data/diagnosis-data.component';
import { MedicationComponent } from '../Pages/Data-Modal/medication/medication.component';
import { MedicationDataComponent } from '../Pages/Data-Management/medication-data/medication-data.component';
import { ProcedureComponent } from '../Pages/Data-Modal/procedure/procedure.component';
import { ProcedureDataComponent } from '../Pages/Data-Management/procedure-data/procedure-data.component';
import { PatientUsersComponent } from '../Pages/patient-users/patient-users.component';
import { HospitalUsersComponent } from '../Pages/hospital-users/hospital-users.component';
import { UserDetailsComponent } from '../Pages/user-details/user-details.component';
import { HospitalUsersListComponent } from '../Pages/hospital-users-list/hospital-users-list.component';
import { PatientUsersListComponent } from '../Pages/patient-users-list/patient-users-list.component';
import { TechnicianListComponent } from '../Pages/technician-list/technician-list.component';
import { AddTechnicianComponent } from '../Pages/add-technician/add-technician.component';

@NgModule({
  declarations: [
    AdminAuthComponent,
    AdminDashboardComponent,
    UserListComponent,
    HospitalRegistrationComponent, 
    DiagnosisDataComponent, MedicationDataComponent, AllergyDataComponent, ProcedureDataComponent,
    AllergyComponent, DiagnosisComponent, MedicationComponent, ProcedureComponent,
    HospitalRegistrationComponent,
    PatientUsersComponent,
    HospitalUsersComponent,
    UserDetailsComponent,
    HospitalUsersListComponent,
    PatientUsersListComponent,
    TechnicianListComponent,
    AddTechnicianComponent
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
    HospitalRegistrationComponent,DiagnosisDataComponent, MedicationDataComponent, AllergyDataComponent, ProcedureDataComponent,
    AllergyComponent, DiagnosisComponent, MedicationComponent, ProcedureComponent,
    HospitalRegistrationComponent,
    PatientUsersComponent,
    HospitalUsersComponent,
    HospitalUsersListComponent,
    PatientUsersListComponent,TechnicianListComponent,AddTechnicianComponent]
})
export class AdminAuthModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthComponent } from './admin-auth.component';
import { AdminDashboardComponent } from '../Pages/admin-dashboard/admin-dashboard.component';
import { HospitalRegistrationComponent } from '../Pages/hospital-registration/hospital-registration.component';
import { DiagnosisDataComponent } from '../Pages/Data-Management/diagnosis-data/diagnosis-data.component';
import { MedicationDataComponent } from '../Pages/Data-Management/medication-data/medication-data.component';
import { AllergyDataComponent } from '../Pages/Data-Management/allergy-data/allergy-data.component';
import { ProcedureDataComponent } from '../Pages/Data-Management/procedure-data/procedure-data.component';
import { UserDetailsComponent } from '../Pages/user-details/user-details.component';
import { PatientUsersListComponent } from '../Pages/patient-users-list/patient-users-list.component';
import { TechnicianListComponent } from '../Pages/technician-list/technician-list.component';
import { AddTechnicianComponent } from '../Pages/add-technician/add-technician.component';




const routes: Routes = [
  {
    path: 'Admin', component: AdminAuthComponent, 
    children: [
      { path: 'Dashboard', component: AdminDashboardComponent },
      { path: 'HospitalRegistration', component: HospitalRegistrationComponent },
      { path: 'UserDetails/:id', component: UserDetailsComponent },
      { path: 'PatientsList', component: PatientUsersListComponent },
      { path: 'TechnicianList', component: TechnicianListComponent },
      { path: 'CreateTechnician', component: AddTechnicianComponent },
     
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }

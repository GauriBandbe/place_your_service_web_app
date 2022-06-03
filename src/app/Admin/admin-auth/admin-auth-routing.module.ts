import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthComponent } from './admin-auth.component';
import { AdminDashboardComponent } from '../Pages/admin-dashboard/admin-dashboard.component';
import { DiagnosisDataComponent } from '../Pages/Data-Management/diagnosis-data/diagnosis-data.component';
import { MedicationDataComponent } from '../Pages/Data-Management/medication-data/medication-data.component';
import { AllergyDataComponent } from '../Pages/Data-Management/allergy-data/allergy-data.component';
import { ProcedureDataComponent } from '../Pages/Data-Management/procedure-data/procedure-data.component';
import { UserDetailsComponent } from '../Pages/user-details/user-details.component';
import { TechnicianListComponent } from '../Pages/technician-list/technician-list.component';
import { AddTechnicianComponent } from '../Pages/add-technician/add-technician.component';
import { AddVendorComponent } from '../Pages/add-vendor/add-vendor.component';
import { VendorListComponent } from '../Pages/vendor-list/vendor-list.component';
import { AddVendorUserComponent } from '../Pages/add-vendor-user/add-vendor-user.component';
import { VendorUserListComponent } from '../Pages/vendor-user-list/vendor-user-list.component';
import { VendorServicesComponent } from '../Pages/vendor-services/vendor-services.component';




const routes: Routes = [
  {
    path: 'Admin', component: AdminAuthComponent, 
    children: [
      { path: 'Dashboard', component: AdminDashboardComponent },
      { path: 'UserDetails/:id', component: UserDetailsComponent },
      { path: 'TechnicianList', component: TechnicianListComponent },
      { path: 'CreateTechnician', component: AddTechnicianComponent },
      { path: 'VendorList', component: VendorListComponent },
      { path: 'CreateVendor', component: AddVendorComponent },
      { path: 'VendorUserList', component: VendorUserListComponent },
      { path: 'CreateVendorUser', component: AddVendorUserComponent },      
      { path: 'VendorServices', component: VendorServicesComponent },      
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }

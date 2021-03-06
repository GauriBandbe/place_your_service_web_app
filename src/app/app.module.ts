import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { LandingModule } from './Landing/landing.module';
import { AdminModule } from './Admin/admin.module';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './Landing/Services/guards.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from './Services/notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GlobalConstants } from './GlobalConstants';
export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    LandingModule,
    AdminModule,
    MDBBootstrapModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/",GlobalConstants.apiURL+"/Login/Login", 
        GlobalConstants.apiURL+"/User/AddTechnician" , GlobalConstants.apiURL+"/MasterData/", 
        GlobalConstants.apiURL+"/Vendor/AddVendor",GlobalConstants.apiURL+"/Technician/ApproveTechnician"],
        disallowedRoutes: []
      }
    }),
    ToastrModule.forRoot()
  ],
  exports : [MaterialModule,AdminModule],
  providers: [AuthGuard, DatePipe,NotificationService,ToastrService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

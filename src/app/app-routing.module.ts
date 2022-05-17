import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Landing/login/login.component';
import { ForgotPasswordComponent } from './Landing/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './Landing/change-password/change-password.component';

import { AdminAuthRoutingModule } from './Admin/admin-auth/admin-auth-routing.module';

import { AuthGuard } from './Landing/Services/guards.service';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'ForgotPassword', component: ForgotPasswordComponent},
  {path: 'ResetPassword', component: ChangePasswordComponent},
  {path: '**', redirectTo: 'Login'},

  {
    path: 'Admin', 
    loadChildren: () => import('./Admin/admin-auth/admin-auth.module').then(m => m.AdminAuthModule),
    canLoad: [AuthGuard] ,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule,AdminAuthRoutingModule]
})
export class AppRoutingModule { }

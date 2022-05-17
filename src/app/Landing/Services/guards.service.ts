import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { map, Observable } from 'rxjs';

@Injectable()
export class AuthGuard   implements CanActivate  {

  constructor(private jwtHelper: JwtHelperService, private router: Router,private http: HttpClient) {
  }
  canActivate() {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

  canLoad() {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
  /***************************************************************************************************/

//For Forgot Password Email

  public SendForgotPasswordEmail(data : any):Observable<boolean>{

    return this.http.post("http://localhost:5000/api/auth/ForgotPassword" , data)
    .pipe(
      map((value:any) => {
        if(value){
          localStorage.setItem('token', value.a)
          return true;
        }
        else{ 
          return false;
        }
     }
     
        )

    )
  
  }

  public ResetPassword(pass : any):Observable<any>{
    return this.http.post("http://localhost:5000/api/auth/ResetPassword", pass )
  }
 
 //For Create Patient User
  public PatientUserRegistration(pass : any):Observable<any>{
    return this.http.post("http://localhost:5000/api/Auth/PatientUserRegistartion" , pass)
  }

}
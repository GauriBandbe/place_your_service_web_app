import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router,private http: HttpClient) { }

//get all active patients list

  public GetAllTechUsers(queryParams : any):Observable<any>
  {
    console.log("queryParams:"+ queryParams)
    const url = GlobalConstants.apiURL+'/Technician/GetTechnician';
    return this.http.get(url, 
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        params:queryParams
      });
  }


  //user account active and deactive funtions
  public UserAccountStatus(queryParams : any):Observable<any>
  {
    const url = 'http://localhost:5000/api/Admin/UserAccountStatus';
    return this.http.get(url, 
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        params:queryParams
      });
  }


  //get users details
  public GetUserDetails(queryParams : any):Observable<any>
  {
    const url = 'http://localhost:5000/api/Admin/GetUserDetails';
    return this.http.get(url, 
      {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params:queryParams
      });
  }

  //Save users details
  
  public UserDetailsSubmit(Patientdetails : any):Observable<any>
  {
    const url = 'http://localhost:5000/api/Admin/UpdateUserDetails';
    return this.http.post<any>(url,
      Patientdetails,
      {
        headers: new HttpHeaders({
			  "Content-Type": "application/json"
			  })
		  });
  }
}

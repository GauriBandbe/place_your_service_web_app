import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSchedulerService {

constructor(private http: HttpClient) { }

public GetAllPhysician():Observable<any>{
    return this.http.get<any>("http://localhost:5002/api/scheduling/GetAllPhysician") }


public GetAllPatient():Observable<any>{
  return this.http.get<any>("http://localhost:5002/api/scheduling/GetAllPatient") }

public GetOnePhysician(data : any):Observable<any>{
    return this.http.get<any>(`http://localhost:5002/api/scheduling/GetOnePhysician` + `?email=` + data) }

public GetOnePatient(data : any):Observable<any>{
    return this.http.get<any>(`http://localhost:5002/api/scheduling/GetOnePatient` + `?email=` + data) }
  
public CreateAppoinement(data : any):Observable<any>{
  return this.http.post<any>("http://localhost:5002/api/scheduling/CreateAnAppointments" ,data )
}

public UpdateAppoinement(data : any):Observable<any>{
  return this.http.post<any>("http://localhost:5002/api/scheduling/UpdateAnAppointments" ,data )
}

public GetPatientInformation(data : any):Observable<any>{
  return this.http.get<any>(`http://localhost:5002/api/scheduling/GetPatientInformation` + `?code=` + data) 
}

public GetAppointmentDetails(data : any):Observable<any>{
  return this.http.get<any>(`http://localhost:5002/api/scheduling/GetAppointmentUpdates` + `?code=` + data) 
}

public DeleteAppointment(data : any):Observable<any>{
  return this.http.get<any>(`http://localhost:5002/api/scheduling/DeleteAppointment` + `?appointmentId=` + data) 
}

public GetCurrentWeekAppointment():Observable<any>{
  return this.http.get<any>("http://localhost:5002/api/scheduling/GetCurrentWeekAppointment") 
}

public getcurrentweekappointmentsByPhysician(data : any):Observable<any>{
  return this.http.get<any>("http://localhost:5002/api/scheduling/GetCurrentWeekAppointmentByPhysicians" + "?email=" + data) 
}

public getcurrentweekappointmentsByPatient(data : any):Observable<any>{
  return this.http.get<any>("http://localhost:5002/api/scheduling/GetCurrentWeekAppointmentByPatients" + "?email=" + data) 
}

public GetAllTimeSlot(data : any , code : any):Observable<any>{
  return this.http.get<any>('http://localhost:5002/api/scheduling/GetAllTimeSlot/' + '?AppointmentDate=' +data + '&&Physcian_UserCode=' + code) 
}

public GetAllTimeSlotFromDatabase(data : any , code1 : any ,code2 : any):Observable<any>{
  return this.http.get<any>('http://localhost:5002/api/scheduling/GetAllTimeSlotFromDatabase' + '?AppointmentDate=' + data + '&&Physcian_UserCode=' + code1 + '&&Patient_UserCode=' + code2) 
}

}
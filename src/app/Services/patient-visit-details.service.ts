import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitDetailsService {

  constructor(private http: HttpClient) { }

 //For Getting All Visit Data By Appointment ID
  public GetAllVisitDataByAppointmentID( Visit_Key :string,Appointment_Key :string ):Observable<any>
  {
    return this.http.get<any>('http://localhost:5001/api/PatientVisitDetail/GetPatientVisitData'+ '?VisitKey=' + Visit_Key + '&&AppointmentKey=' + Appointment_Key) 
  }

 //For Diagnosis Master List
 public GetAllDiagnosisMasterList():Observable<any>
 {
  return this.http.get<any>('http://localhost:5001/api/PatientVisitDetail/GetDiagnosisMasterData') 
 }

  //For Procedure Master List
  public GetAllProcedureMasterList():Observable<any>
  {
    return this.http.get<any>('http://localhost:5001/api/PatientVisitDetail/GetProcedureMasterData') 
  }

 //For Medication Master List
  public GetAllMedicationMasterList():Observable<any>
  {
  return this.http.get<any>('http://localhost:5001/api/PatientVisitDetail/GetMedicationMasterData') 
  }

  //For Save Vital Signs
  public SavePatientVitalSignDetails(VitalSignData : any):Observable<any>
  {
    return this.http.post("http://localhost:5001/api/PatientVisitDetail/SavePatientVitalSignDetails",VitalSignData)
  }

  //For Save Diagnosis Data
  public SavePatientDiagnosisDetails(DiagnosisData : any,EmailID1 : string,Visit_Key : string):Observable<any>
  {
    return this.http.post('http://localhost:5001/api/PatientVisitDetail/SavePatientDiagnosisDetails/' ,({"DignosisList" :DiagnosisData,"EmailID": EmailID1,"visitKey":Visit_Key}))
  }

  //For Save Procedure Data
  public SavePatientProcedureDetails(ProcedureTableList : any,EmailID1 : string,Visit_Key : string):Observable<any>
  {
    return this.http.post('http://localhost:5001/api/PatientVisitDetail/SavePatientProcedureDetails/' ,({"ProcedureList" : ProcedureTableList,"EmailID": EmailID1,"visitKey":Visit_Key}) )
  } 
  //For Save Medication Data
  public SavePatientMedicationDetails(MedicationTableList : any,EmailID1 : string,Visit_Key : string):Observable<any>
  {
    return this.http.post('http://localhost:5001/api/PatientVisitDetail/SavePatientMedicationDetails/' ,({"MedicationList" : MedicationTableList,"EmailID": EmailID1,"visitKey":Visit_Key}) )
  } 

  //Close Visit Details
  public CloseVisitDetails(EmailID1 : string,Visit_Key : string):Observable<any>
  {
    return this.http.post('http://localhost:5001/api/PatientVisitDetail/CloseVisitDetails/' ,({"EmailID": EmailID1,"visitKey":Visit_Key}) )
  } 

   //Schedule Visit Details
   public PatientAppointmentScheduleList(EmailID1 : string):Observable<any>
   {  
     return this.http.get<any>('http://localhost:5001/api/PatientVisitDetail/PatientAppointmentScheduleList'+ '?EmailID=' + EmailID1 )
   } 
}

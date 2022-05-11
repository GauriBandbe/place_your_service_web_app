import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterdataServiceService {

  constructor(private http: HttpClient) { }

  public AddDiagnosisData(pass : any):Observable<any>{
    return this.http.post("http://localhost:5000/api/auth/AddDiagnosisData", pass )
  }

  public AddProcedureData(pass : any):Observable<any>{
    return this.http.post("http://localhost:5000/api/auth/AddProcedureData", pass )
  }

  public AddDrugData(pass : any):Observable<any>{
    return this.http.post("http://localhost:5000/api/auth/AddDrugData", pass )
  }

  public AddAllergyData(pass : any):Observable<any>{
    return this.http.post("http://localhost:5000/api/auth/AddAllergyData", pass )
  }

  public GetDiagnosisData():Observable<any>{
    return this.http.get("http://localhost:5000/api/auth/GetDiagnosisData")
  }
  public GetDrugMasterData():Observable<any>{
    return this.http.get("http://localhost:5000/api/auth/GetDrugMasterData")
  }
  public GetProcedureMasterData():Observable<any>{
    return this.http.get("http://localhost:5000/api/auth/GetProcedureMasterData")
  }
  public GetAllergyMasterData():Observable<any>{
    return this.http.get("http://localhost:5000/api/auth/GetAllergyMasterData")
  }
}

export interface HospitalUser {
    EmployeeId : string;
    Employee_Name : string;
    Date_of_Registrations : string;
    Status : string;
    Edit : string;
    User_Status : string
}

export interface Patient {
    PatientId : string;
    Patient_Name : string;
    Date_of_Registration : string;
    Status : string;
    Edit : string;
    User_Status : string;
}



export interface allergy{
    Allergy_Name : string;
    Allergy_Description :string;
    Allergy_Type :string;
 }

 export interface procedure{
    Procedure_Id : number;
    Procedure_Code : string;
    Procedure_Description : string;
    IsProcedure_Depricated : string;
 }

 export interface diagnosis{
    Diagnosis_Id : number;
    Diagnosis_Description : string;
    Diagnosis_Type : string;
    IsDepricated : string;
}

export interface medication{
    Drug_Id : string;
    Drug_Name : string;
    Drug_Manufacturer_Name : string;
    Drug_Strength : string;
    Drug_Form : string;
}

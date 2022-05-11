export class Diagnosis
{
    diagnosisID:number;
    dCode:string;
    dDescription:string;
    diagnosisIsDeprecated:boolean

    constructor(DiagnosisID:number,DiagnosisCode: string,DiagnosisDescription: string ,DiagnosisIsDeprecated: boolean )
    {
        this.diagnosisID = DiagnosisID;
        this.dCode = DiagnosisCode;
        this.dDescription= DiagnosisDescription;
        this.diagnosisIsDeprecated = DiagnosisIsDeprecated;
    }     
}
export class Procedure
{
    procedureID:number;
    pCode:string;
    pDescription:string;
    procedureIsDeprecated:boolean;
    
    constructor(PID: number,ProcedureCode: string,ProcedureDescription: string ,ProcedureIsDeprecated: boolean)
    {
        this.procedureID = PID;
        this.pCode = ProcedureCode;
        this.pDescription= ProcedureDescription;
        this.procedureIsDeprecated = ProcedureIsDeprecated;
    }  
}
export class Allergy
{
    allergyId: string;
    allergyType: string ; 
    allergyClinicalInformation:string;
    allergyName:string;

    constructor(allergyId: string,allergyType: string ,allergyclinicalInfo: string,allergyName: string )
    {
        this.allergyId = allergyId;
        this.allergyType= allergyType;
        this.allergyClinicalInformation = allergyclinicalInfo;
        this.allergyName = allergyName;
    }
   
        
}
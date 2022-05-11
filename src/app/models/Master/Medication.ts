export class Medication
{
    drugId:string;
    drugName:string;
    drugGenericName:string;
    drugBrandName:string;
    drugForm :string ;
    drugStrength:string;
    
    constructor(DrugId: string,DrugName: string ,DrugGenericName: string,DrugBrandName:string, DrugForm:string,DrugStrength:string)
    {
        this.drugId = DrugId;
        this.drugName= DrugName;
        this.drugGenericName = DrugGenericName;
        this.drugBrandName = DrugBrandName;
        this.drugForm = DrugForm;
        this.drugStrength=DrugStrength;
    }  
}
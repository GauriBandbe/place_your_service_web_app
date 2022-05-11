export class AllergyDetails
{
    allergyClinicalInformation:string;
    allergyName:string;
    allergyType:string;

    constructor(allergyName:string,allergyClinicalInformation:string,allergyType:string) {
        this.allergyName = allergyName;
        this.allergyClinicalInformation= allergyClinicalInformation;
        this.allergyType = allergyType;
    }
}
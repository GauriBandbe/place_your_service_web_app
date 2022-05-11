export class Appointments{
    appointmentId:number;
    appointmentDt:Date;
    appointmentSlot:string;
    patient:string;
    physician:string;
    description:string;
    appointmentStatus:string;
    appointmentType:string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class AppointmentSchedular{
    title:string;
    date:string;
    backgroundColor:string;
    appointmentDescription:null;
    appointmentId: number;
    patientId: null;
    physicianId: null;
    schedulerId: null;
    appointmentTime: null;
    appointmentCreation: null;
    isdeleted: null
    createdOn: null;
    updateOn: null;
    physicianFirstName: null;
    physicianLastName: null;
    patientFirstName: null;
    patientLastName: null;
    patient: null;
    physician: null;
    scheduler: null;
    srNO:null;
    status:null;
    scheduler_email: null;
    physicianTitle: null;
    patientTitle: null;
    patient_UserCode: null;
    physcian_UserCode: null;
    appointmentDate: null;
    appointmentTitle: null;
    appointment_Modification: null;
    message: null;

}
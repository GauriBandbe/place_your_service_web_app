import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthGuard } from 'src/app/Landing/Services/guards.service';
import { NotificationService } from 'src/app/Services/notification.service';
import  Swal  from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss']
})
export class AddTechnicianComponent  implements OnInit {
   
  //  var latest_date =this.datepipe.transform(a, 'yyyy-MM-dd');

   // console.log(latest_date)
   public loginstarts :boolean =false;
    registerForm!: FormGroup;
    submitted = false;
    invaliddob : string | any;
    constructor(private router: Router,
        private formBuilder: FormBuilder, public datepipe: DatePipe,
        private act : AuthGuard , private route: ActivatedRoute,
        private notifyService : NotificationService,private http: HttpClient, ) { }

    todayDate:Date = new Date();
    latest_date =this.datepipe.transform(this.todayDate, 'yyyy-MM-dd');

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            gender: ['', Validators.required],
            titleCode: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile_1: ['', Validators.required],
            mobile_2: [''],
            landLine: [''],
            date_of_Birth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],        
            uidaI_Aadhar: ['123456789012'],
            uidaI_Aadhar_Masked: [''],
            bloodGroup_Code: [1],            
            vendorCode: [2],
            postalAddress: ['Mumbai'],
            
            // Address: ['', Validators.required],
            // Address2: ['', Validators.required],
            // City: ['', Validators.required],
            // state: ['', Validators.required],
            
            // validates date format yyyy-mm-dd
           
            
        }
        // , {
        //     validator: MustMatch('password', 'confirmPassword')
        // }
                
        );
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    IsValid : string | any ;
    onSubmit() {

        this.submitted = true;
        var user = this.registerForm.value
        
        console.log(this.registerForm.value);   
        this.registerForm.value.bloodGroup_Code =1;
        this.registerForm.value.vendorCode =2;
        this.registerForm.value.titleCode =1;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loginstarts=true;
        
        const token = localStorage.getItem("jwt") as string;
		 
          var reqHeader = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        });
        console.log(token);
        // display form values on success
        this.http.post<any>('http://placeyourservicewebapi-dev.ap-south-1.elasticbeanstalk.com/api/User/AddTechnician' ,   
        ({
         "gender": this.registerForm.value.gender,
         "titleCode": 1,
         "firstName": this.registerForm.value.firstName,
         "middleName":  this.registerForm.value.middleName,
         "lastName": this.registerForm.value.lastName,
         "email": this.registerForm.value.email,
         "mobile_1": this.registerForm.value.mobile_1,
         "mobile_2": "",
         "landLine": "",
         "date_of_Birth":this.registerForm.value.date_of_Birth,
         "uidaI_Aadhar": this.registerForm.value.uidaI_Aadhar,
         "uidaI_Aadhar_Masked": "",
         "bloodGroup_Code": 1,
         "vendorCode": 2,
         "postalAddress":  this.registerForm.value.postalAddress
         }),{ headers: reqHeader })
        //this.act.CreateTechnicianUser(this.registerForm.value)
        .subscribe((data)=> 
        {
          console.log(data);
          if(data.isAddSuccess==true){
              Swal.fire({
                  text: data.message+ " User code: "+  data.userCode +" and Password is: "+  data.password,
                  icon: 'success'
                });
              // this.notifyService.showSuccess(data.message.message, "Success")
          }
          else{
              Swal.fire({
                  text: data.validationStatuses.validationMessage,
                  icon: 'error'
                });
              // this.notifyService.showError(data.message.message, "Error")
          }
          this.loginstarts=false;
          this.onReset();       
      })                                                                                                        
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    url: any; //Angular 11, for stricter type
    msg = "";
    url2: any; //Angular 11, for stricter type
    msg2 = "";
    url3: any; //Angular 11, for stricter type
    msg3 = "";
    //selectFile(event) { //Angular 8
    selectFile(event: any) { //Angular 11, for stricter type
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg = 'You must select an image';
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        return;
      }
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.msg = "";
        this.url = reader.result; 
      }
    }
    selectFile2(event: any) { //Angular 11, for stricter type
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg2 = 'You must select an image';
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg2 = "Only images are supported";
        return;
      }
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.msg2 = "";
        this.url2 = reader.result; 
      }
    }
    selectFile3(event: any) { //Angular 11, for stricter type
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg3 = 'You must select an image';
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg3 = "Only images are supported";
        return;
      }
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.msg3 = "";
        this.url3 = reader.result; 
      }
    }
}

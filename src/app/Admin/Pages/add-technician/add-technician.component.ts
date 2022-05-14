import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthGuard } from 'src/app/Landing/Services/guards.service';
import { NotificationService } from 'src/app/Services/notification.service';
import  Swal  from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploadService } from 'src/app/file-upload.service';

interface toppingList {
  id: number;
  name: string;
}
interface Vendor {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss']
})
export class AddTechnicianComponent  implements OnInit {
   
  //  var latest_date =this.datepipe.transform(a, 'yyyy-MM-dd');
  shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File ;
   // console.log(latest_date)
   public loginstarts :boolean =false;
    registerForm!: FormGroup;
    submitted = false;
    invaliddob : string | any;
    constructor(private router: Router,
        private formBuilder: FormBuilder, public datepipe: DatePipe,
        private act : AuthGuard , private route: ActivatedRoute,
        private notifyService : NotificationService,private http: HttpClient, 
        private fileUploadService: FileUploadService,) { }

    todayDate:Date = new Date();
    latest_date =this.datepipe.transform(this.todayDate, 'yyyy-MM-dd');

    ngOnInit() {
      this.getVendorList();
        this.registerForm = this.formBuilder.group({
            gender: ['', Validators.required],
            titleCode: [''],
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
            bloodGroup_Code: ['', Validators.required],            
            vendorCode: [2],
            postalAddress: ['Mumbai'],
            vendor:['', Validators.required],
            Address: ['', Validators.required],
            Address2: ['', Validators.required],
            City: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            district: ['', Validators.required],
            zipCode: ['', Validators.required],
            landmark: ['', Validators.required],
            //technicalQualification: ['', Validators.required],
            workExperience: ['', Validators.required],
            //typeofWork: ['', Validators.required],
            
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
        //
        
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
         "postalAddress":  this.registerForm.value.Address + " " + this.registerForm.value.Address2 + " " + this.registerForm.value.landmark +" "
         + this.registerForm.value.zipCode +" "+ this.registerForm.value.city +" " + this.registerForm.value.district+ " " + this.registerForm.value.state+ " " + this.registerForm.value.country
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
                this.router.navigate(['/Admin/TechnicianList']);
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
      }
      , (error) => {                              //Error callback
        console.error('error caught in component')
       console.log(error)
       var errmsg="";
       errmsg="<ul>"
       for(var i=0;i< error.error.validationStatuses.length;i++ ){
        errmsg+= "<li>" + error.error.validationStatuses[i].validationMessage +"</li>"
       }      
       errmsg+="</ul>"
       Swal.fire({
        title: '<strong>'+error.error.message+'</strong>',
        icon: 'info',
        html:errmsg,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false      })
        //throw error;   //You can also throw the error to a global error handler
      })                                                                                                        
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    // For Profile Image
    name = 'Angular 4';
    url: any;
    msg = "";
    url2: any; //Angular 11, for stricter type
    msg2 = "";
    url3: any; //Angular 11, for stricter type
    msg3 = "";
    private fileList: string[] = new Array<string>();
       
    onSelectFile(event: any) {

       var filePath = event.target.value; 
       console.log(filePath);
       this.file = event.target.files[0];
    //    this.fileUploadService.upload(this.file).subscribe(
    //     (event: any) => {
    //         if (typeof (event) === 'object') {

    //             // Short link via api response
    //             this.shortLink = event.link;

    //             this.loading = false; // Flag variable 
    //         }
    //     }
    // );
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg = 'You must select an image';
        Swal.fire({
          text: this.msg,
          icon: 'error'
        });
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        Swal.fire({
          text: this.msg,
          icon: 'error'
        });
        return;
      }
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        // reader.onload = (event) => { // called once readAsDataURL is completed
        //   this.url = event.target.result;
        // }
        reader.onload = (_event) => {
          this.msg = "";
          this.url = reader.result; 
        }
        console.log(event.target.files);
      }
    }

    // public delete(){
    //   this.url = null;
    // }
    //End For profile Image
    onSelectFile2(event: any) {
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg2 = 'You must select an image';
        Swal.fire({
          text: this.msg2,
          icon: 'error'
        });
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg2 = "Only images are supported";
        Swal.fire({
          text: this.msg2,
          icon: 'error'
        });
        return;
      }
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        // reader.onload = (event) => { // called once readAsDataURL is completed
        //   this.url = event.target.result;
        // }
        reader.onload = (_event) => {
          this.msg2 = "";
          this.url2 = reader.result; 
        }
      }
    }
    
    onSelectFile3(event: any) {
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg3 = 'You must select an image';
        Swal.fire({
          text: this.msg3,
          icon: 'error'
        });
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg3 = "Only images are supported";
        Swal.fire({
          text: this.msg3,
          icon: 'error'
        });
        return;
      }
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        // reader.onload = (event) => { // called once readAsDataURL is completed
        //   this.url = event.target.result;
        // }
        reader.onload = (_event) => {
          this.msg3 = "";
          this.url3 = reader.result; 
        }
      }
    }
     //Angular 11, for stricter type
    
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

    //For drop down
    typeofWork = new FormControl();
    technicalQualification= new FormControl();
    // toppingList: Array []= [
    //   {"1":"Extra cheese"},  {"2":"Mushroom"}, {"3":"Onion"}, {"4":"Pepperoni"}, {"5":"Sausage"}, {"6":"Tomato"}];

    toppingList :toppingList[] = [
      { id: 1, name: "ITI Turner" },
      { id: 2, name: "ITI Fiter" },
      { id: 3, name: "ITI Electrical" },
      { id: 4, name: "ITI Computer" },
      { id: 5, name: "ITI Mechanical" },
    ];
    //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    selectedFood = this.toppingList[0].name;
getvalue(event: any) {
  // = (event.target as HTMLSelectElement).value;
 //console.log(event.source.value);
  console.log(event);
  // const num =event;
  // console.log(this.toppingList[num].name);
  
}
vendor: Vendor[] = [];
getVendorList(){
  const token = localStorage.getItem("jwt") as string;
		 
          var reqHeader = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        });
 
  this.http.get<any>('http://placeyourservicewebapi-dev.ap-south-1.elasticbeanstalk.com/api/MasterData/GetVendorDDL',{ headers: reqHeader } )
  .subscribe(response => {
    console.log(response);
    for(var i=0; i<response.length;i++){
      var vdr={ value :response[i].key ,viewValue : response[i].value } ;      
      this.vendor.push(vdr)
    }
    console.log( this.vendor);
  })
}

}

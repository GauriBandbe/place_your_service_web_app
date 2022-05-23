import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthGuard } from 'src/app/Landing/Services/guards.service';
import { NotificationService } from 'src/app/Services/notification.service';
import  Swal  from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploadService } from 'src/app/file-upload.service';
import { GlobalConstants } from 'src/app/GlobalConstants';
import { kMaxLength } from 'buffer';

interface TypeofWork {
  value: number;
  viewValue: string;
}
interface Vendor {
  value: string;
  viewValue: string;
}
interface Bloodgroup{
  value: string;
  viewValue: string;
}
interface Tservise {
  //id: number;
}
@Component({
  selector: 'app-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss']
})
export class AddTechnicianComponent  implements OnInit {
  file: File ;
  public usert = Number(localStorage.getItem("userTypeCode"));
  public vendorCodet = Number(localStorage.getItem("vendorCode"));
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
        this.getBloodgroupList();
        this.gettypeofWorkList();
        this.gettypeofTechQualificationList();
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
            uidaI_Aadhar: ['', [Validators.required,Validators.pattern("[0-9]{12}")] ],
            uidaI_Aadhar_Masked: [''],
            bloodGroup_Code: ['', Validators.required],            
            vendorCode: [2],
            postalAddress: ['Mumbai'],
            vendor:[''],
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
        );
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    IsValid : string | any ;
   

    // For Profile Image
    name = 'Angular 4';
    url: any;
    msg = "";
    url2: any; //Angular 11, for stricter type
    msg2 = "";
    url3: any; //Angular 11, for stricter type
    msg3 = "";
    private fileList: string[] = new Array<string>();
    selectedFile : File;
    //For getting Profile file
    onUploadProfileFile(event: any) {

       var filePath = event.target.value; 
       console.log(filePath);
       this.file = event.target.files[0];
   
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

      // ********************For Upload file
      this.selectedFile = event.target.files[0];
      const uploadFormData = new FormData();
      uploadFormData.append('myFile', this.selectedFile, this.selectedFile.name);
      console.log(uploadFormData)
      //Upload file here send a binary data
      this.http.post('http://localhost:4200/src/assets/images/file-upload/',uploadFormData)
      .subscribe(response => {
        console.log("File uploaded...")
      });
      // ********************End For Upload file
    }

    // public delete(){
    //   this.url = null;
    // }
    //End For profile Image

     //For getting Adhar front file
    onUploadAdharFrontFile(event: any) {
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
    
    //For getting Adhar Back file
    onUploadAdharBackFile(event: any) {
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
   

  

//For Type of Work
typeofWorkList :TypeofWork[]= [];
typeofWorkList2 :TypeofWork[] = [];

typeofWorks = new FormControl();
selectedWork : any;
gettypeofWorkList(){
 const token = localStorage.getItem("jwt") as string;
    
         var reqHeader = new HttpHeaders({ 
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+ token
       });

 this.http.get<any>(GlobalConstants.apiURL+'/MasterData/GetWorkType',{ headers: reqHeader } )
 .subscribe(response => {  
   for(var i=0; i<response.length;i++){
     var Tservise={ value :response[i].key ,viewValue : response[i].description } ;      
     this.typeofWorkList.push(Tservise)
   }
 })
  
}
 //For Qualification Dropdown
typeofTechQualificationList :TypeofWork[]= [];
typeofTechQualificationList2 :TypeofWork[] = [];

typeofTechQualifications = new FormControl();
selectedTechQualification : any;
gettypeofTechQualificationList(){
const token = localStorage.getItem("jwt") as string;

     var reqHeader = new HttpHeaders({ 
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+ token
   });

this.http.get<any>(GlobalConstants.apiURL+'/MasterData/GetQualification',{ headers: reqHeader } )
.subscribe(response => {  
for(var i=0; i<response.length;i++){
 var Tservise={ value :response[i].key ,viewValue : response[i].description } ;      
 this.typeofTechQualificationList.push(Tservise)
}
})

}

    //For get Type of work Dropdown
    gettypeofWorkvalue(event: any) {
      // = (event.target as HTMLSelectElement).value;
     //console.log(event.source.value);
      console.log(event);
      // const num =event;
      // console.log(this.toppingList[num].name);
      
    }    
  

//For get Vendor List
vendor: Vendor[] = [];
getVendorList(){
  const token = localStorage.getItem("jwt") as string;
		 
          var reqHeader = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        });
 
  this.http.get<any>(GlobalConstants.apiURL+'/MasterData/GetVendorDDL',{ headers: reqHeader } )
  .subscribe(response => {
    console.log(response);
    for(var i=0; i<response.length;i++){
      var vdr={ value :response[i].key ,viewValue : response[i].value } ;      
      this.vendor.push(vdr)
    }
    console.log( this.vendor);
  })
}

//For get Bloodgroup List
bloodgroup: Bloodgroup[] = [];
getBloodgroupList(){
  const token = localStorage.getItem("jwt") as string;
		 
          var reqHeader = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        });
 
  this.http.get<any>(GlobalConstants.apiURL+'/MasterData/GetBloodGroup',{ headers: reqHeader } )
  .subscribe(response => {
    console.log(response);
    for(var i=0; i<response.length;i++){
      var bdl={ value :response[i].key ,viewValue : response[i].value } ;      
      this.bloodgroup.push(bdl)
    }
    console.log( this.bloodgroup);
  })
}

//For Add Technician
typeofWorkListM : Tservise[] = [];
typeofTechQualificationListM : Tservise[] = [];
onSubmit() {
  this.typeofWorkListM=[];
  this.typeofWorkList2=[];
  this.typeofTechQualificationListM=[];
  this.typeofTechQualificationList2=[];

  this.submitted = true;
  var user = this.registerForm.value
    
  console.log(this.registerForm.value);   
  this.registerForm.value.uidaI_Aadhar =String(this.registerForm.value.uidaI_Aadhar);
  this.registerForm.value.titleCode = 1;
  this.registerForm.value.bloodGroup_Code = Number(this.registerForm.value.bloodGroup_Code);
  // stop here if form is invalid
  //
  
  if (this.registerForm.invalid) {
      return;
  }
 //For TechQualification
 if(this.typeofTechQualifications.value != null){
  for(var i=0; i<this.typeofTechQualifications.value.length;i++){
    var Tservise2={ value : 0 ,viewValue : this.typeofTechQualifications.value[i] } ;      
    this.typeofTechQualificationList2.push(Tservise2)
  }
  
 }else{
  Swal.fire({
    text: "Please select type of Technical Qualification.",
    icon: 'error'
  });
  return;
 }

 
 if(this.typeofTechQualificationList2.length >0){
  for(var i=0; i<this.typeofTechQualificationList2.length;i++){
    let index  = this.typeofTechQualificationList.findIndex(item => item.viewValue == this.typeofTechQualificationList2[i].viewValue);
    if(index>0){
      this.typeofTechQualificationListM.push(this.typeofTechQualificationList[index].value) 
    }   
  }
 }else{
  Swal.fire({
    text: "Please select type of Technical Qualification.",
    icon: 'error'
  });
  return;
 }
   //For Work
 if(this.typeofWorks.value != null){
  for(var i=0; i<this.typeofWorks.value.length;i++){
    var Tservise2={ value : 0 ,viewValue : this.typeofWorks.value[i] } ;      
    this.typeofWorkList2.push(Tservise2)
  }
  
 }else{
  Swal.fire({
    text: "Please select type of Works.",
    icon: 'error'
  });
  return;
 }

 
 if(this.typeofWorkList2.length >0){
  for(var i=0; i<this.typeofWorkList2.length;i++){
    let index  = this.typeofWorkList.findIndex(item => item.viewValue == this.typeofWorkList2[i].viewValue);
    if(index>0){
      this.typeofWorkListM.push(this.typeofWorkList[index].value)     
    }   
  }
 }else{
  Swal.fire({
    text: "Please select type of Works.",
    icon: 'error'
  });
  return;
 }

if(this.usert==1){
  this.vendorCodet=Number(this.registerForm.value.vendor);
  if(this.vendorCodet==0){
    Swal.fire({
      text: "Please select vendor.",
      icon: 'error'
    });
    return;
  }
}else{
  this.vendorCodet = Number(localStorage.getItem("vendorCode"));
}

  this.loginstarts=true;
  const Vname= this.registerForm.value.firstName +" "+this.registerForm.value.lastName;
  const token = localStorage.getItem("jwt") as string;

    var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
  });
  //console.log(token);
  // display form values on success
  this.http.post<any>(GlobalConstants.apiURL+'/User/AddTechnician' ,   
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
   "bloodGroup_Code": this.registerForm.value.bloodGroup_Code,
   "vendorCode": this.vendorCodet,
   "workTypeCodeList": this.typeofWorkListM,
   "qualificationCodeList": this.typeofTechQualificationListM,
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
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 9000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: Vname +" "+data.message
          })
        
    }
    else{
        Swal.fire({
            text: data.message,
            icon: 'error'
          });
    }
    this.loginstarts=false;
    //this.onReset();       
}
, (error) => {     
  this.loginstarts=false;                         //Error callback
  console.error("error caught in component");
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
//End For Add Technician

}

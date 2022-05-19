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

interface Vendor {
  value: string;
  viewValue: string;
}
interface TypeofService {
  value: number;
  viewValue: string;
}
interface Tservise {
  //id: number;
}
@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

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
       this.gettypeofServiceList()
       this.registerForm = this.formBuilder.group({
           vendorType: ['', Validators.required],
           vendorGST:  ['', Validators.required],
           vendorEstDate: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],               
           vendorEmpStrength:['', Validators.required],
           vendorName: ['', Validators.required],
           vendorMobile: ['', Validators.required],
           vendorEmail: ['', [Validators.required, Validators.email]],
           vendorAddress: ['', Validators.required],  
          // typeOfService : ['', Validators.required],     
       }     
       );
   }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   IsValid : string | any ;
  
//For get Vendor List
vendor: Vendor[] = [];
getVendorList(){
 const token = localStorage.getItem("jwt") as string;
    
         var reqHeader = new HttpHeaders({ 
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+ token
       });

 this.http.get<any>(GlobalConstants.apiURL+'/MasterData/GetVendorType',{ headers: reqHeader } )
 .subscribe(response => {
   for(var i=0; i<response.length;i++){
     var vdr={ value :response[i].key ,viewValue : response[i].description } ;      
     this.vendor.push(vdr)
   }
 })
}

//For Type of services
typeofServiceList: TypeofService[] = [];
typeofServiceList2: TypeofService[] = [];

typeofServices = new FormControl();
selectedService : any;
gettypeofServiceList(){
 const token = localStorage.getItem("jwt") as string;
    
         var reqHeader = new HttpHeaders({ 
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+ token
       });

 this.http.get<any>(GlobalConstants.apiURL+'/MasterData/GetServiceType',{ headers: reqHeader } )
 .subscribe(response => {  
   for(var i=0; i<response.length;i++){
     var Tservise={ value :response[i].key ,viewValue : response[i].description } ;      
     this.typeofServiceList.push(Tservise)
   }
 })
  
}

gettypeOfServicevalue(value : any){
  
}
typeofServiceListM : Tservise[] = [];
//For Add Vendor
onSubmit() {

 this.typeofServiceListM=[];
 this.typeofServiceList2=[];
 this.submitted = true;
 //this.typeofServiceList2=this.typeofServices.value;
 if(this.typeofServices.value != null){
  for(var i=0; i<this.typeofServices.value.length;i++){
    var Tservise2={ value : 0 ,viewValue : this.typeofServices.value[i] } ;      
    this.typeofServiceList2.push(Tservise2)
  }
  
 }else{
  Swal.fire({
    text: "Please select type of services.",
    icon: 'error'
  });
  return;
 }

 
 if(this.typeofServiceList2.length >0){
  for(var i=0; i<this.typeofServiceList2.length;i++){
    let index  = this.typeofServiceList.findIndex(item => item.viewValue == this.typeofServiceList2[i].viewValue);
    if(index>0){
      //var Tservise1={  } ; 
      this.typeofServiceListM.push(this.typeofServiceList[index].value)     
      //this.typeofServiceListM += this.typeofServiceList[index].value +",";
    }   
  }
 }else{
  Swal.fire({
    text: "Please select type of services.",
    icon: 'error'
  });
  return;
 }
 //this.typeofServiceListM="["+this.typeofServiceListM+"]";
 
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
 const Vtype = Number(this.registerForm.value.vendorType);
 const Vname= this.registerForm.value.vendorName;
 const vEmpStrength = Number(this.registerForm.value.vendorEmpStrength);

 // display form values on success
 this.http.post<any>(GlobalConstants.apiURL+'/Vendor/AddVendor' ,   
 ({
  "vendorType": Vtype,
  "vendorGST": this.registerForm.value.vendorGST,
  "vendorEstDate": this.registerForm.value.vendorEstDate,
  "vendorEmpStrength": vEmpStrength,
  "vendorName": this.registerForm.value.vendorName,
  "vendorMobile": this.registerForm.value.vendorMobile,
  "vendorEmail": this.registerForm.value.vendorEmail,
  "vendorAddress":this.registerForm.value.vendorAddress,
  "serviceTypeCodeList": this.typeofServiceListM
}),{ headers: reqHeader })
 .subscribe((data)=> 
 {

   if(data.isAddSuccess==true){
       Swal.fire({
           text: data.message,
           icon: 'success'
         });
         this.router.navigate(['/Admin/VendorList']);

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
         
}
, (error) => {      
  this.loginstarts=false;        
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
//End For Add Vendor

}

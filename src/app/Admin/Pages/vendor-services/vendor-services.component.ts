import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/GlobalConstants';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
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
interface Pincode{
  district :string;
  state :string;
  key :number;
  value: string;
  description: string;
  descriptionM: string;
}
@Component({
  selector: 'app-vendor-services',
  templateUrl: './vendor-services.component.html',
  styleUrls: ['./vendor-services.component.scss']
})
export class VendorServicesComponent implements OnInit {
  public loginstarts :boolean =false;
  registerForm!: FormGroup;
  submitted = false;
  public vendorCodet = Number(localStorage.getItem("vendorCode"));
  constructor(private router: Router,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,private http: HttpClient,
    @Inject(DOCUMENT) private domDocument: Document,) { } 

  ngOnInit(): void {
    this.getVendorList();
    this.gettypeofServiceList();
    this.registerForm = this.formBuilder.group({    
      vendor: ['', Validators.required],
      typeOfService: [''],
      pinCode: ['']
  }     
  );
  }
  get f() { return this.registerForm.controls; }

  IsValid : string | any ;
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

//For Pincode
userList1: Pincode[] = [];
pincodeMaster: Pincode[] = [];
userDatakey: Pincode[] = [];
userData: Pincode[] = [];
lastkeydown1: number = 0;
PincodeTableList : Pincode[] = [];
getUserIdsFirstWay($event : any) {
  let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;

  console.log("userId2")
  console.log(userId)
  this.userList1 = [];

  if (userId.length >= 5) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.getPincodeList(userId)
      this.userList1 = this.searchFromArray(this.userData, userId);
         
   }
   if(this.userList1.length==0 && userId.length >= 8){
     console.log( "userList1");
     this.userDatakey = this.searchkeyFromArray(this.pincodeMaster, userId);
     console.log( this.userDatakey );
     this.getAllAddressValue(userId);
   }
    
  }
}  
getPincodeList(value : any) {
  const token = localStorage.getItem("jwt") as string;
      
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ token
});
this.http.get<any>(GlobalConstants.apiURL+'/Vendor/SearchVendorPagePincode'+ `?pincode=` + value,{headers: reqHeader} )
.subscribe(response => {
  
  for(var i=0; i<response.length;i++){
    var pinL2={ district :response[i].district ,state :response[i].state ,key :response[i].key ,value :response[i].value ,description : response[i].value +"-"+response[i].description
    ,descriptionM : response[i].description } ;      
    this.pincodeMaster.push(pinL2)
  }

Object.assign(this.userData, this.pincodeMaster);

 })
}
searchFromArray(arr : any, regex : any) {
  console.log("arr"); console.log(arr);
  //let matches = [], i;
  let matches = [], i;
  
  for (i = 0; i < arr.length; i++) {
    if (arr[i].value.match(regex)) {
      matches.push(arr[i]);
    }
  }
  //matches.pop();
  console.log( "matches");
  console.log( regex);
  console.log( matches);
  return matches;
};

searchkeyFromArray(arr : any, regex : any) {
  console.log("arr"); console.log(arr);
  //let matches = [], i;
  let matches = [], i;
  
  for (i = 0; i < arr.length; i++) {
    if (arr[i].value.match(regex)) {
      matches.push(arr[i]);
    }
  }
  //matches.pop();
  console.log( "matches");
  console.log( regex);
  console.log( matches);
  return matches;
};
getAllAddressValue(userIdkey: any){
  console.log("keysss")
  console.log(userIdkey)
  let index  = this.pincodeMaster.findIndex(item => item.description == userIdkey);
  if(index>-1){
  
    (<HTMLInputElement>document.getElementById('userIdFirstWay')).value="";


    let index2:number = this.PincodeTableList.findIndex(x => x.key == this.pincodeMaster[index].key);
    if(index2 < 0){
      this.PincodeTableList.push({ district: this.pincodeMaster[index].district,
        state:this.pincodeMaster[index].state ,
        key:this.pincodeMaster[index].key,
        value :this.pincodeMaster[index].value ,
        description : this.pincodeMaster[index].description,
        descriptionM : this.pincodeMaster[index].descriptionM
      })
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Record is already added!'
      });
      return;
    }
  } 
}
Remove_PincodeData(Pinno:number)
{
  console.log("delete")
  Swal.fire({
    title: 'Are you sure?',
    text: "You wants to delete this pincode entry!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Yes, cancel it!'
  }).then((result) => 
  {
   
    if (result.isConfirmed) 
    {
      let index  = this.PincodeTableList.findIndex(item => item.key == Pinno);
      this.PincodeTableList.splice(index, 1);
      Swal.fire({
        text: "Deleted successfully!",
        icon: 'success'
      });
    }      
    else if (result.dismiss === Swal.DismissReason.cancel) 
    {
      Swal.fire(
        'Cancelled',
        'This Pincode entry not Deleted :)',
        'error'
      )
    }
  }) 
 
}

getpincodeListAgainstVendor(){
  this.PincodeTableList=[];
 const VenCode_1=Number(this.registerForm.value.vendor);
 const token = localStorage.getItem("jwt") as string;
  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ token
});
this.http.post<any>(GlobalConstants.apiURL+'/Vendor/GetVendorPinAndService' ,   
({
  "code": VenCode_1
}),{ headers: reqHeader })
.subscribe((response)=> 
    {
      for(var i=0; i<response.pinCodeList.length;i++){
        var pinL2={ district :response.pinCodeList[i].district ,
          state :response.pinCodeList[i].state ,
          key :response.pinCodeList[i].key ,
          value :response.pinCodeList[i].value ,
          description : response.pinCodeList[i].value +"-"+response.pinCodeList[i].description
        ,descriptionM : response.pinCodeList[i].description } ;      
        this.PincodeTableList.push(pinL2)
      }
    }
  )               
}
//For Submit
typeofServiceListM : Tservise[] = [];
PincodeTableListM : Tservise[] = [];
onSubmit() {
  this.typeofServiceListM=[];
  this.typeofServiceList2=[];
  this.submitted = true;
  if (this.registerForm.invalid) {
    Swal.fire({
      text: "Please select vendor.",
      icon: 'error'
    });
    return;
  }
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
     if(index>-1){
       this.typeofServiceListM.push(this.typeofServiceList[index].value)     
     }   
   }
  }else{
   Swal.fire({
     text: "Please select type of services.",
     icon: 'error'
   });
   return;
  }

  if(this.PincodeTableList.length == 0){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please add atleat one pincode detail to submit!',
    });   
    return;
  }

  if(this.PincodeTableList.length >0){
    for(var i=0; i<this.PincodeTableList.length;i++){
      this.PincodeTableListM.push(this.PincodeTableList[i].key) 
    }
   }

this.loginstarts=true;
this.vendorCodet=Number(this.registerForm.value.vendor);
const token = localStorage.getItem("jwt") as string;

  var reqHeader = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ token
});
console.log(this.vendorCodet);
console.log(this.PincodeTableListM);
this.http.post<any>(GlobalConstants.apiURL+'/Vendor/SaveVendorServiceType' ,   
({
  "vendorCode": this.vendorCodet,
  "codeList": this.typeofServiceListM
}),{ headers: reqHeader })
.subscribe((data)=> 
    {
     //*********************************For Saving pincode type***************** */
     this.http.post<any>(GlobalConstants.apiURL+'/Vendor/SaveVendorPincodes' ,   
     ({
       "vendorCode": this.vendorCodet,
       "codeList": this.PincodeTableListM
     }),{ headers: reqHeader })
     .subscribe((data)=> 
         {
           if(data.isAddSuccess==true){ 
             Swal.fire({
               text: data.message,
               icon: 'success',
               
             });
             this.PincodeTableList=[];
             /********************************get pincode list */
             for(var i=0; i<data.pincodeDataList.length;i++){
               var pinL2={ district :data.pincodeDataList[i].district ,
                 state :data.pincodeDataList[i].state ,
                 key :data.pincodeDataList[i].key ,
                 value :data.pincodeDataList[i].value ,
                 description : data.pincodeDataList[i].value +"-"+data.pincodeDataList[i].description
               ,descriptionM : data.pincodeDataList[i].description } ;      
               this.PincodeTableList.push(pinL2)
             }
             /******************************************* */
           }
           else{
             Swal.fire({
                 text: data.message,
                 icon: 'error'
               });
           }
          
          // setTimeout(() => {this.domDocument.location.reload()}, 1000);
           this.loginstarts=false;
                 
         }, 
         (error) => 
         {      
           this.loginstarts=false;        
           console.error("error caught in component");
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
         }
       ) 
 //*********************************For Saving pincode type***************** */
      this.loginstarts=false;
            
    }, 
    (error) => 
    {      
      this.loginstarts=false;        
      console.error("error caught in component");
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
    }
  ) 

}

onReset() {
  this.submitted = false;
  this.PincodeTableList=[];
  this.getVendorList();
  this.registerForm.reset();
 }

 refreshPage() {
  window.location.reload();
  }
}




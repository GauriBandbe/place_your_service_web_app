
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../Services/admin.service';
let TechUserData =[];
//Sweet Alerts
import Swal from 'sweetalert2';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GlobalConstants } from 'src/app/GlobalConstants';
import { Router } from '@angular/router';
export interface UserData {
  userCode: string;
  profile: string;
  technicianName: string;
  mobile_1: string;
  uidaI_Aadhar: string;
  adharStatus: string;
  
}

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.scss']
})
export class TechnicianListComponent implements OnInit {
  public adharStatusUrl="";
  Email : any="";
  public mode:string = "1";
  public usert = Number(localStorage.getItem("userTypeCode"));
  public vendorCodet = Number(localStorage.getItem("vendorCode"));
  hasFilters : boolean;
  alltechdatas: any;
  UserForm : FormGroup | undefined;
  displayedColumns: string[] = ['userCode', 'Profile', 'Name', 'Mobile No','Adhar No','Adhar status','Action'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 
  
   constructor( private router: Router,private act : AdminService,private http: HttpClient,) { }
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
  
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
   
   ngOnInit(): void {
     this.getTechnicianUsers();
     
    }
 
 //get all patient users list
  getTechnicianUsers()
  {

    console.log("getTechnicianUsers");
   let queryParams = new HttpParams().append( "hasFilters", false)
   const token = localStorage.getItem("jwt") as string;
		 
   var reqHeader = new HttpHeaders({ 
   'Content-Type': 'application/json',
   'Authorization': 'Bearer '+ token
 });
 if(this.usert==1){
  this.vendorCodet=0;
  this.hasFilters=false;
}else{
  this.vendorCodet = Number(localStorage.getItem("vendorCode"));
  this.hasFilters=true;
}
    
    this.http.post<any>(GlobalConstants.apiURL+'/Technician/GetTechnician' 
    ,({"hasFilters" :this.hasFilters,"usePaging":true,"pageSize":1000,"currentIndex":1,"userCodeList":[0],"vendorCodeList":[this.vendorCodet]})
    ,{ headers: reqHeader })
    .subscribe(data => {
    //  })


    //  this.act.GetAllTechUsers(queryParams).subscribe(data => 
    //  {
      console.log(data);
        const datas = (<any>data);
       // datas.profile="'./assets/images/Beared Guy02-min 2.png'";
         this.alltechdatas = datas;
         TechUserData=this.alltechdatas;
         console.log(TechUserData);
          
         TechUserData.forEach((element: { isAdminApproved: any;Isdisabled : any }) => {
           if(element.isAdminApproved== 1)
           {
            element.isAdminApproved = '../../../assets/images/Approvestatus.png';
            element.Isdisabled= true;
           }else if(element.isAdminApproved== 0)
           {
            element.isAdminApproved = '../../../assets/images/Rejectstatus.png';
            element.Isdisabled= true;
           }
           else{
            element.isAdminApproved = '../../../assets/images/Pendingstatus.png';
            element.Isdisabled= false;
           }
       });
         // Assign the data to the data source for the table to render
         this.dataSource = new MatTableDataSource(TechUserData);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
 
      }, err => {
      console.log(err)
      });
  }
 //Approve Adhar Status
ApproveAdharStatus(userCode:any,Isdisabled : boolean)
{
  if(Isdisabled==true){
    Swal.fire({
      text: "Sorry!! You already changed the status.",
      icon: 'warning'
    });
    return;
  }
  const userTypeCode = Number(localStorage.getItem("userTypeCode"));
  if(userTypeCode== 0 || userTypeCode== 1){
    const vendorCode = Number(localStorage.getItem("userCode"));
    console.log(userCode);
    console.log(vendorCode);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Yes, reject it!'
    }).then((result) => 
    {
      console.log(result);
      if (result.isConfirmed) 
      {
        if(userCode!=null)
        {
         //For Confirmation API
         const token = localStorage.getItem("jwt") as string;
  
         var reqHeader = new HttpHeaders({ 
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+ token
       });
         this.http.post<any>(GlobalConstants.apiURL+'/Technician/ApproveTechnician' ,   
         ({
          "userCode": userCode,
          "vendorCode": vendorCode,
          "approveStatus": true
          }),{ headers: reqHeader })
         //this.act.CreateTechnicianUser(this.registerForm.value)
         .subscribe((data)=> 
         {
           console.log(data);
           if(data.isApproveSuccess==true){
               Swal.fire({
                   text: data.message,
                   icon: 'success'
                 });
                 this.getTechnicianUsers();
           }
           else{
               Swal.fire({
                   text: data.validationStatuses.validationMessage,
                   icon: 'error'
                 });
           }
             
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
         //End
        }
        
  
      }      
      else if (result.dismiss === Swal.DismissReason.cancel) 
      {
        if(userCode!=null)
        {
         //For Confirmation API
         const token = localStorage.getItem("jwt") as string;
  
         var reqHeader = new HttpHeaders({ 
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+ token
       });
         this.http.post<any>(GlobalConstants.apiURL+'/Technician/ApproveTechnician' ,   
         ({
          "userCode": userCode,
          "vendorCode": vendorCode,
          "approveStatus": false
          }),{ headers: reqHeader })
         .subscribe((data)=> 
         {
           console.log(data);
           if(data.isApproveSuccess==true){
               Swal.fire({
                   text: data.message,
                   icon: 'success'
                 });
                 this.getTechnicianUsers();
           }
           else{
               Swal.fire({
                   text: data.validationStatuses.validationMessage,
                   icon: 'error'
                 });
           }
             
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
         //End
        }
      }
    }) 
  }
  else{
    Swal.fire({
      text: "You are not authorized to change the adhar status.",
      icon: 'warning'
    });
  }
}
}

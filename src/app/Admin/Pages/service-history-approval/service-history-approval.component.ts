import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-history-approval',
  templateUrl: './service-history-approval.component.html',
  styleUrls: ['./service-history-approval.component.scss']
})
export class ServiceHistoryApprovalComponent implements OnInit {

  jwthelper = new JwtHelperService();
  email : any="";
  emailId : string;
  constructor(private http : HttpClient) { }

  ngOnInit(): void 
  {

    var totalNurse:string;
    var totalPhysician:string;
    var totalUsers :string;
    var totalPatient :string
   
  }
  public dashCard = [
    { colorDark: 'NewRequest', colorLight: '#7986CB', number: 20, title: 'New Request', icon: './../../../../assets/images/Sidemenu_icon/Box1.png' },
    { colorDark: '#6BB5EA', colorLight: '#64B5F6', number: 14, title: 'In Progress', icon: './../../../../assets/images/Sidemenu_icon/Box2.png' },
    { colorDark: '#18D184', colorLight: '#4DB6AC', number: 5, title: 'Completed', icon: './../../../../assets/images/Sidemenu_icon/Box3.png' },
    { colorDark: '#C8281E', colorLight: '#81C784', number: 1, title: 'Cancelled', icon: './../../../../assets/images/Sidemenu_icon/Box4.png' },
    { colorDark: '#C8281E', colorLight: '#81C784', number: 1, title: 'Cancelled', icon: './../../../../assets/images/Sidemenu_icon/Box4.png' }
];

ApproveServiceStatus()
{
  // if(Isdisabled==true){
  //   Swal.fire({
  //     text: "Sorry!! You already changed the status.",
  //     icon: 'warning'
  //   });
  //   return;
  // }
  const userTypeCode = Number(localStorage.getItem("userTypeCode"));
  if(userTypeCode== 0 || userTypeCode== 1){
    const vendorCode = Number(localStorage.getItem("userCode"));
  
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
        Swal.fire({
          text: "Data Approve successfully!!!",
          icon: 'success'
        });
      //   if(userCode!=null)
      //   {
      //    //For Confirmation API
      //    const token = localStorage.getItem("jwt") as string;
  
      //    var reqHeader = new HttpHeaders({ 
      //    'Content-Type': 'application/json',
      //    'Authorization': 'Bearer '+ token
      //  });
      //    this.http.post<any>(GlobalConstants.apiURL+'/Technician/ApproveTechnician' ,   
      //    ({
      //     "userCode": userCode,
      //     "vendorCode": vendorCode,
      //     "approveStatus": true
      //     }),{ headers: reqHeader })
      //    //this.act.CreateTechnicianUser(this.registerForm.value)
      //    .subscribe((data)=> 
      //    {
      //      console.log(data);
      //      if(data.isApproveSuccess==true){
      //          Swal.fire({
      //              text: data.message,
      //              icon: 'success'
      //            });
      //            this.getTechnicianUsers();
      //      }
      //      else{
      //          Swal.fire({
      //              text: data.validationStatuses.validationMessage,
      //              icon: 'error'
      //            });
      //      }
             
      //  }
      //  , (error) => {                              //Error callback
      //    console.error('error caught in component')
      //   console.log(error)
      //   var errmsg="";
      //   errmsg="<ul>"
      //   for(var i=0;i< error.error.validationStatuses.length;i++ ){
      //    errmsg+= "<li>" + error.error.validationStatuses[i].validationMessage +"</li>"
      //   }      
      //   errmsg+="</ul>"
      //   Swal.fire({
      //    title: '<strong>'+error.error.message+'</strong>',
      //    icon: 'info',
      //    html:errmsg,
      //    showCloseButton: true,
      //    showCancelButton: true,
      //    focusConfirm: false      })
      //    //throw error;   //You can also throw the error to a global error handler
      //  })
      //    //End
      //   }
        
  
      }      
      else if (result.dismiss === Swal.DismissReason.cancel) 
      {
        Swal.fire({
          text: "Data Reject successfully!!!",
          icon: 'success'
        });
      //   if(userCode!=null)
      //   {
      //    //For Confirmation API
      //    const token = localStorage.getItem("jwt") as string;
  
      //    var reqHeader = new HttpHeaders({ 
      //    'Content-Type': 'application/json',
      //    'Authorization': 'Bearer '+ token
      //  });
      //    this.http.post<any>(GlobalConstants.apiURL+'/Technician/ApproveTechnician' ,   
      //    ({
      //     "userCode": userCode,
      //     "vendorCode": vendorCode,
      //     "approveStatus": false
      //     }),{ headers: reqHeader })
      //    .subscribe((data)=> 
      //    {
      //      console.log(data);
      //      if(data.isApproveSuccess==true){
      //          Swal.fire({
      //              text: data.message,
      //              icon: 'success'
      //            });
      //            //////this.getTechnicianUsers();
      //      }
      //      else{
      //          Swal.fire({
      //              text: data.validationStatuses.validationMessage,
      //              icon: 'error'
      //            });
      //      }
             
      //  }
      //  , (error) => {                              //Error callback
      //    console.error('error caught in component')
      //   console.log(error)
      //   var errmsg="";
      //   errmsg="<ul>"
      //   for(var i=0;i< error.error.validationStatuses.length;i++ ){
      //    errmsg+= "<li>" + error.error.validationStatuses[i].validationMessage +"</li>"
      //   }      
      //   errmsg+="</ul>"
      //   Swal.fire({
      //    title: '<strong>'+error.error.message+'</strong>',
      //    icon: 'info',
      //    html:errmsg,
      //    showCloseButton: true,
      //    showCancelButton: true,
      //    focusConfirm: false      })
      //    //throw error;   //You can also throw the error to a global error handler
      //  })
      //    //End
      //   }
      }
    }) 
  }
  else{
    Swal.fire({
      text: "You are not authorized to change the service status.",
      icon: 'warning'
    });
  }
}
}

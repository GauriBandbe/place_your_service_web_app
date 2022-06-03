import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
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
    // this.email  = localStorage.getItem('jwt');
     //const decrypt = this.jwthelper.decodeToken(this.email) ;
    // console.log(decrypt.Email);
    // this.emailId = decrypt.Email;
    // this.http.get<any>('http://localhost:5002/api/scheduling/GetDashboardData',{params:new HttpParams().set('email',this.emailId)}).subscribe(data => {
    //   console.log(data);
    //   data.forEach((element: { totalNurse: string;totalPhysician:string;totalUsers:string;totalPatient:string }) => {
    //     totalNurse = element.totalNurse
    //     totalUsers = element.totalUsers
    //     totalPhysician = element.totalPhysician
    //     totalPatient = element.totalPatient
    //   });
    // let userStr = JSON.stringify(data);
    // let respJson = JSON.parse(userStr);
    
    
    //   this.dashCard = [
    //     { colorDark: '#5C6BC0', colorLight: '#7986CB', number: Number(totalPatient), title: 'Patient', icon: 'face icon' },
    //     { colorDark: '#42A5F5', colorLight: '#64B5F6', number: Number(totalPhysician), title: 'Physician', icon: 'today' },
    //     { colorDark: '#26A69A', colorLight: '#4DB6AC', number: Number(totalNurse), title: 'Nurse', icon: 'calendar_today' },
    //     { colorDark: '#66BB6A', colorLight: '#81C784', number: Number(totalUsers), title: 'Total Users', icon: 'face icon' },
    //     // { colorDark: '#66BB6A', colorLight: '#81C784', number: 1221, title: 'BANKING', icon: 'account_balance' },
    //     // { colorDark: '#66BB6A', colorLight: '#81C784', number: 1221, title: 'BANKING', icon: 'account_balance' }
    // ];

    // })
  }
  public dashCard = [
    { colorDark: 'NewRequest', colorLight: '#7986CB', number: 20, title: 'New Request', icon: './../../../../assets/images/Sidemenu_icon/Box1.png' },
    { colorDark: '#6BB5EA', colorLight: '#64B5F6', number: 14, title: 'In Progress', icon: './../../../../assets/images/Sidemenu_icon/Box2.png' },
    { colorDark: '#18D184', colorLight: '#4DB6AC', number: 5, title: 'Completed', icon: './../../../../assets/images/Sidemenu_icon/Box3.png' },
    { colorDark: '#C8281E', colorLight: '#81C784', number: 1, title: 'Cancelled', icon: './../../../../assets/images/Sidemenu_icon/Box4.png' }
];
}

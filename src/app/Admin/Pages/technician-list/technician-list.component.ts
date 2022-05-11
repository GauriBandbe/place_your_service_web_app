
import { HttpClient, HttpParams } from '@angular/common/http';
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

  Email : any="";
  public mode:string = "1";

  alltechdatas: any;
  UserForm : FormGroup | undefined;
  displayedColumns: string[] = ['userCode', 'Profile', 'Name', 'Mobile No','Adhar No','Adhar status','Action'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 
  
   constructor( private act : AdminService,private http: HttpClient,) { }
 
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
   

    this.http.post<any>('http://placeyourservicewebapi-dev.ap-south-1.elasticbeanstalk.com/api/Technician/GetTechnician' ,({"hasFilters" :true,"usePaging":true,"pageSize":10,"currentIndex":1,"userCodeList":[0],"vendorCodeList":[2]}))
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
         TechUserData.forEach((element: { isAdminApproved: any; }) => {
           if(element.isAdminApproved== 1)
           {
             element.isAdminApproved = "Approved";
           }else if(element.isAdminApproved== 0)
           {
             element.isAdminApproved = "Rejected";
           }
           else{
             element.isAdminApproved = "pending";
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
 
}

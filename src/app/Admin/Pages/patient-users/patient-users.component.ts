import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../Services/admin.service';
let PatientUserData =[];
//Sweet Alerts
import Swal from 'sweetalert2';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
@Component({
  selector: 'app-patient-users',
  templateUrl: './patient-users.component.html',
  styleUrls: ['./patient-users.component.scss']
})
export class PatientUsersComponent implements OnInit
{
  public mode:string = "1";

 allpatientdatas: any;
 UserForm : FormGroup | undefined;
 displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','Edit','Delete','Action'];
 dataSource: MatTableDataSource<UserData>;
 @ViewChild(MatPaginator)
 paginator!: MatPaginator;
@ViewChild(MatSort)
 sort: MatSort = new MatSort;

 
  constructor( private act : AdminService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
 

  ngOnInit(): void {
    this.getPatientUsers();
    
   }

//get all patient users list
 getPatientUsers()
 {

  let queryParams = new HttpParams().append("usertype","Patient");
   
  //  this.act.GetAllUsers(queryParams).subscribe(data => 
  //  {
  //      const datas = (<any>data).data;

  //       this.allpatientdatas = datas;
  //       PatientUserData=this.allpatientdatas;
  //       PatientUserData.forEach((element: { account: any; }) => {
  //         if(element.account=="Active")
  //         {
  //           element.account = true;
  //         }
  //         else{
  //           element.account = false;
  //         }
  //     });
  //       // Assign the data to the data source for the table to render
  //       this.dataSource = new MatTableDataSource(PatientUserData);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;

  //    }, err => {
  //    console.log(err)
  //    });
 }

//based on mat slide toggle here user account enabled and disabled

 public toggle(event: MatSlideToggleChange ,  UserKey :string)
  {
    
    if(event.checked)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want Enable this User",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5c6bc0',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Enable it!'
      }).then((result) => 
      {
        if (result.isConfirmed) 
        {
          Swal.fire(
            'Success',
            "Enabled successfully",
            'success'                
          )
          this.UserAccountStatus("Patient","Active" ,UserKey);
         
          event.source.checked = true;
        } 
        else if (result.dismiss === Swal.DismissReason.cancel) 
        {
          Swal.fire(
            'Cancelled',
            'This User not be Enabled :)',
            'error'
          )
          event.source.checked = false;
        }
        
      })
    }
    else
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want Disable this User",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5c6bc0',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Disable it!'
      }).then((result) => 
      {
        if (result.isConfirmed) 
        {
          Swal.fire(
            'Success',
            "Disable successfully",
            'success'                
          )
          this.UserAccountStatus("Patient","Deactive" ,UserKey);
          event.source.checked = false;
        } 
        else if (result.dismiss === Swal.DismissReason.cancel) 
        {
          Swal.fire(
            'Cancelled',
            'This User not be Disabled :)',
            'error'
          )
          event.source.checked = true;
        }
        
      })

    }
  }


//user account active and deactive funtions
  UserAccountStatus(UserType: string,AccountStatus : string ,UserId:string)
  {
 
    let queryParams = new HttpParams().append("UserType",UserType);
    queryParams = queryParams.append('AccountStatus', AccountStatus);
    queryParams = queryParams.append('UserId', UserId);
   
    this.act.UserAccountStatus(queryParams).subscribe(data => 
    {
        const datas = (<any>data);
 
         console.log(datas);
 
      }, err => {
      console.log(err)
      });
  }

//Soft Delete  patient from system
DeleteUsers(UserId:string)
{
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5c6bc0',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => 
  {
    if (result.isConfirmed) 
    {
      if(UserId!=null)
      {
        this.allpatientdatas.forEach((value: { userKey: string; },index: any)=>
        {
          if(value.userKey==UserId)
              this.allpatientdatas.splice(index,1);
        });
      }
      
      this.UserAccountStatus("Patient","Blocked" ,UserId);
    
      PatientUserData=this.allpatientdatas;

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(PatientUserData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } 
    else if (result.dismiss === Swal.DismissReason.cancel) 
    {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })





  
}


}

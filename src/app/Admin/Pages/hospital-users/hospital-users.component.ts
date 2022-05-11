import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../Services/admin.service';

//Sweet Alerts
import Swal from 'sweetalert2';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

let HospitalUserData =[];
@Component({
  selector: 'app-hospital-users',
  templateUrl: './hospital-users.component.html',
  styleUrls: ['./hospital-users.component.scss']
})
export class HospitalUsersComponent implements OnInit {
  HospitalusersdataSource: MatTableDataSource<UserData>;
  public mode:string = "1";
  public useDefault = false;
  allhospitaldatas:any;
  UserForm : FormGroup | undefined;
  @ViewChild(MatPaginator)
   paginator!: MatPaginator;
  @ViewChild(MatSort)
   sort: MatSort = new MatSort;
   displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','Edit','Delete','Action'];

  constructor(private act : AdminService) { }

  ngOnInit(): void {
    this.getHospitalUsers();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.HospitalusersdataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.HospitalusersdataSource.paginator) {
      this.HospitalusersdataSource.paginator.firstPage();
    }
  }

  getHospitalUsers()
  {
 
   let queryParams = new HttpParams().append("usertype","HospitalUser");
  
    // this.act.GetAllUsers(queryParams).subscribe(data => 
    // {
    //     const datas = (<any>data).data;
 
    //      this.allhospitaldatas = datas;
    //      HospitalUserData=this.allhospitaldatas;
    //      HospitalUserData.forEach((element: { account: any; }) => {
    //           if(element.account=="Active")
    //           {
    //             element.account = true;
    //           }
    //           else{
    //             element.account = false;
    //           }
    //       });
    //      // Assign the data to the data source for the table to render
    //      this.HospitalusersdataSource = new MatTableDataSource(HospitalUserData);
    //      this.HospitalusersdataSource.paginator = this.paginator;
    //      this.HospitalusersdataSource.sort = this.sort;
 
    //   }, err => {
    //   console.log(err)
    //   });
  }

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
          this.UserAccountStatus("HospitalUser","Active" ,UserKey);
         
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
          this.UserAccountStatus("HospitalUser","Deactive" ,UserKey);
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
        this.allhospitaldatas.forEach((value: { userKey: string; },index: any)=>
        {
          if(value.userKey==UserId)
              this.allhospitaldatas.splice(index,1);
        });
      }
      
      this.UserAccountStatus("Patient","Blocked" ,UserId);
    
      HospitalUserData=this.allhospitaldatas;

      // Assign the data to the data source for the table to render
      this.HospitalusersdataSource = new MatTableDataSource(HospitalUserData);
      this.HospitalusersdataSource.paginator = this.paginator;
      this.HospitalusersdataSource.sort = this.sort;

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

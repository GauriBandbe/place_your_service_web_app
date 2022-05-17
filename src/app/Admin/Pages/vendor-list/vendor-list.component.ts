
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
import { FasDirective } from 'angular-bootstrap-md';
export interface UserData {
  vendorName: string;
  vendorGST: string;
  vendorMobile: string;
  vendorEmail: string;
  
}
@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  Email : any="";
  public mode:string = "1";

  alltechdatas: any;
  UserForm : FormGroup | undefined;
  displayedColumns: string[] = ['vendorCode','vendorName', 'vendorGST', 'vendorMobile', 'vendorEmail'];
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
     this.getVendorUsers();
     
    }
 
 //get all patient users list
  getVendorUsers()
  {
    console.log("getVendorUsers");
   let queryParams = new HttpParams().append( "hasFilters", false)
   const token = localStorage.getItem("jwt") as string;
		 
   var reqHeader = new HttpHeaders({ 
   'Content-Type': 'application/json',
   'Authorization': 'Bearer '+ token
 });

    var userCode = Number(localStorage.getItem("userCode"));
    console.log(userCode);
    this.http.post<any>(GlobalConstants.apiURL+'/Vendor/GetVendor' 
    ,({"hasFilters" :false,"usePaging":true,"pageSize":10,"currentIndex":1,"vendorCodeList":[0],"vendorGSTList":[""]})
    ,{ headers: reqHeader })
    .subscribe(data => {
      console.log(data);
        const datas = (<any>data);
        this.alltechdatas = datas;
        TechUserData=this.alltechdatas;
        console.log(TechUserData);
        
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(TechUserData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
      console.log(err)
      });
  }
 
}


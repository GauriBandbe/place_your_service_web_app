import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../Services/admin.service';
let TechUserData =[];
//Sweet Alerts
import Swal from 'sweetalert2';
import { GlobalConstants } from 'src/app/GlobalConstants';
export interface UserData {
  Srno: number;
  CustPhonenumber: string;
  status: string;
  orderNumber: string;
  orderDate: string;
  serviceProblem: string;
  amount: string;
  
}
@Component({
  selector: 'app-service-history-list',
  templateUrl: './service-history-list.component.html',
  styleUrls: ['./service-history-list.component.scss']
})
export class ServiceHistoryListComponent implements OnInit {

  submitted = false;
  Email : any="";
  public mode:string = "1";

  alltechdatas: any;
  pageIndex: any;
  pageSize: any;
  registerForm!: FormGroup;
  UserForm !: FormGroup;
  displayedColumns: string[] = ['Srno','CustPhonenumber','status','orderNumber', 'orderDate', 'serviceProblem', 'amount'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 
  
   constructor( private act : AdminService,private http: HttpClient,private formBuilder: FormBuilder, ) { }
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
  
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
   
   ngOnInit(): void {
    
    this.UserForm = this.formBuilder.group({
      PageEntry: ['5', Validators.required],  
      fromDate: ['', Validators.required] , 
      ToDate: ['', Validators.required]  
  }  
   
  );
     this.getVendorUsers();
     
    }
    get f() { return this.UserForm.controls; }
 //get all patient users list
  deptsArray:UserData[] =
  [
    {Srno : 1 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    {Srno : 2 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    {Srno : 3 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    {Srno : 4 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    {Srno : 5 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    {Srno : 6 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    {Srno : 7 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    {Srno : 8 ,CustPhonenumber: "+91 9876543211", status : "New",  orderNumber :  "123456789",  orderDate :  "1 April 2022", serviceProblem:"Air conditioner",amount: "Rs. 250.00"} ,
    
  ];
  getVendorUsers()
  {
    
  
   let queryParams = new HttpParams().append( "hasFilters", false)
   const token = localStorage.getItem("jwt") as string;
		 
   var reqHeader = new HttpHeaders({ 
   'Content-Type': 'application/json',
   'Authorization': 'Bearer '+ token
 });

    var userCode = Number(localStorage.getItem("userCode"));
    console.log(userCode);
    // this.http.post<any>(GlobalConstants.apiURL+'/Vendor/GetVendor' 
    // ,({"hasFilters" :false,"usePaging":true,"pageSize":1000,"currentIndex":1,"vendorCodeList":[0],"vendorGSTList":[""]})
    // ,{ headers: reqHeader })
    // .subscribe(data => {
    //   console.log(data);
    //     const datas = (<any>data);
    //     this.alltechdatas = datas;
    //     TechUserData=this.alltechdatas;
    //     console.log(TechUserData);
        
    //     // Assign the data to the data source for the table to render
    //     this.dataSource = new MatTableDataSource(TechUserData);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   }, err => {
    //   console.log(err)
    //   });
        this.alltechdatas = this.deptsArray;
        TechUserData=this.alltechdatas;
        console.log(TechUserData);
        
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(TechUserData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }
  changePage(e:any) {
    // var value = e.options[e.selectedIndex].value;
    // var text = e.options[e.selectedIndex].text;
    // console.log(value);
    // console.log(text);
    console.log(e);
    this.pageSize=e.pageSize;
    this.pageIndex=e.pageIndex +1;
    this.getVendorUsers();

  }

}

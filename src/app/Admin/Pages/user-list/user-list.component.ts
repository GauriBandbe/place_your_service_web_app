import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AdminService } from '../../Services/admin.service';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss',
], 
encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements AfterViewInit  {
  

 public mode:string = "1";

 
 ngOnInit(): void {
  
  
 }

 constructor() 
 {
   
 }

 ngAfterViewInit() {
   
 }
}

 


 






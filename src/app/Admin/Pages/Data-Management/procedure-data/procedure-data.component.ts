import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { procedure } from 'src/app/models/admin';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import { ProcedureComponent } from '../../Data-Modal/procedure/procedure.component';

export interface UserData {
  ProcedureID: number;
  PCode: string;
  PDescription: string;
  IsDeprecated: string;
}
let procedurelists: any[]=[];

@Component({
  selector: 'app-procedure-data',
  templateUrl: './procedure-data.component.html',
  styleUrls: ['./procedure-data.component.scss']
})
export class ProcedureDataComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 emails: string;
 
 public displayedColumns: string[] = ['ProcedureID', 'PCode', 'PDescription', 'IsDeprecated'];

 procedurelist:UserData[]=[];
  dataSource=new MatTableDataSource<UserData>(this.procedurelist);

  constructor(private MasterdataService : MasterdataServiceService,public dialog: MatDialog) { 
    this.dataSource=new MatTableDataSource<UserData>(this.procedurelist);
  }

  openDialog() {
    this.dialog.open(ProcedureComponent , {width : '400px'});
  }
  
  public employeeTableData$: Observable<procedure[]>


  public isShowFilterInput = false;

  ngOnInit(): void {
    this.getproceduredata();
  }
  getproceduredata(){
    this.MasterdataService.GetProcedureMasterData().subscribe(data=>{
      console.log(data);
      this.procedurelist = data;
      procedurelists = this.procedurelist;
      this.dataSource = new MatTableDataSource(procedurelists);
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    })
  }


}

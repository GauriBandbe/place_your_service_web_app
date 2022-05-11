import { SelectionModel } from '@angular/cdk/collections';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { diagnosis } from 'src/app/models/admin';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import { DiagnosisComponent } from '../../Data-Modal/diagnosis/diagnosis.component';

export interface UserData {
  DiagnosisID: number;
  DCode: string;
  DDescription: string;
  IsDeprecated: boolean;
}
let diagnosislists: any[]=[];
@Component({
  selector: 'app-diagnosis-data',
  templateUrl: './diagnosis-data.component.html',
  styleUrls: ['./diagnosis-data.component.scss']
})
export class DiagnosisDataComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 emails: string;
 

 public displayedColumns: string[] = ['DiagnosisID', 'DCode', 'DDescription', 'IsDeprecated'];

  diagnosislist:UserData[]=[];
  dataSource=new MatTableDataSource<UserData>(this.diagnosislist);

  constructor(public dialog: MatDialog,@Inject(DOCUMENT) private domDocument: Document,private MasterdataService : MasterdataServiceService) { 
    this.dataSource=new MatTableDataSource<UserData>(this.diagnosislist);

  }
  
  
  public employeeTableData$: Observable<diagnosis[]>

  openDialog() {
    this.dialog.open(DiagnosisComponent , {width : '400px'});
  }

  public isShowFilterInput = false;

  ngOnInit(): void {
    this.getdianosisdata()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getdianosisdata(){
          this.MasterdataService.GetDiagnosisData().subscribe(data=>{
            console.log(data);
            this.diagnosislist = data;
            diagnosislists = this.diagnosislist;
            this.dataSource = new MatTableDataSource(diagnosislists);
            this.dataSource.paginator = this.paginator;
    
            this.dataSource.sort = this.sort;

          })
  }

  // @Input() materialTableDate: Customer[];
  // public displayedColumns: string[] = ['name', 'email', 'product', 'price', 'date', 'city', 'status'];
  // public dataSource: Customer[];


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // public masterToggle(): void {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  // public checkboxLabel(row?: any): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  // public applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  // public showFilterInput(): void {
  //   this.isShowFilterInput = !this.isShowFilterInput;
  //   this.dataSource = new MatTableDataSource<diagnosis>(this.employeeTableData);
  // }


}

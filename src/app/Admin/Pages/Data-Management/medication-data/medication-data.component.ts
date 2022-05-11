import { SelectionModel } from '@angular/cdk/collections';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { medication } from 'src/app/models/admin';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import { MedicationComponent } from '../../Data-Modal/medication/medication.component';

export interface UserData {
  drug_id: string;
  drug_name: string;
  drug_generic_name: string;
  drug_brand_name: string;
  drug_form : string;
  drug_strength : string;
}
let medicationlists: any[]=[];

@Component({
  selector: 'app-medication-data',
  templateUrl: './medication-data.component.html',
  styleUrls: ['./medication-data.component.scss']
})
export class MedicationDataComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 emails: string;
 
 public displayedColumns: string[] = ['drug_id', 'drug_name', 'drug_generic_name', 'drug_brand_name' , 'drug_form' , 'drug_strength'];

 medicationlist:UserData[]=[];
  dataSource=new MatTableDataSource<UserData>(this.medicationlist);

  constructor(public dialog: MatDialog,private MasterdataService : MasterdataServiceService) { 
    this.dataSource=new MatTableDataSource<UserData>(this.medicationlist);
  }

  public employeeTableData$: Observable<medication[]>

  openDialog() {
    this.dialog.open(MedicationComponent , {width : '400px'});
  }

  public isShowFilterInput = false;

  ngOnInit(): void {
    this.getmedicationlist()
  }

  getmedicationlist(){
    this.MasterdataService.GetDrugMasterData().subscribe(data=>{
      console.log(data);
      this.medicationlist = data;
      medicationlists = this.medicationlist;
      this.dataSource = new MatTableDataSource(medicationlists);
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    })
  }
}

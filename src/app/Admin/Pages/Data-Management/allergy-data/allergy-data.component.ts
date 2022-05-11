import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { allergy } from 'src/app/models/admin';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import { AllergyComponent } from '../../Data-Modal/allergy/allergy.component';

export interface UserData {
  aid: string;
  allergy_type: string;
  allergy_name: string;
  allergy_source: string;
  allerginicity : string;
  iso_forms_of_partial_of_allergen : string;
}
let allergylists: any[]=[];
@Component({
  selector: 'app-allergy-data',
  templateUrl: './allergy-data.component.html',
  styleUrls: ['./allergy-data.component.scss']
})
export class AllergyDataComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 @ViewChild(MatSort)
  sort: MatSort = new MatSort;
 emails: string;

  public displayedColumns: string[] = ['aid', 'allergy_type', 'allergy_name','allergy_source','allerginicity','iso_forms_of_partial_of_allergen' ];

  allergylist:UserData[]=[];
  dataSource=new MatTableDataSource<UserData>(this.allergylist);

  constructor(public dialog: MatDialog,private MasterdataService : MasterdataServiceService) { 
    this.dataSource=new MatTableDataSource<UserData>(this.allergylist);
  }

  openDialog() {
    this.dialog.open(AllergyComponent , {width : '400px'});
  }
  
  public employeeTableData$: Observable<allergy[]>

  public isShowFilterInput = false;


  ngOnInit(): void {
    this.getallergydata();

  }
  getallergydata(){
    this.MasterdataService.GetAllergyMasterData().subscribe(data=>{
      console.log(data);
      this.allergylist = data;
      allergylists = this.allergylist;
      this.dataSource = new MatTableDataSource(allergylists);
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    })
  }



}


import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/file-upload.service';
import { GlobalConstants } from 'src/app/GlobalConstants';

interface Pincodedrodown{
  key: string;
  viewValue: string;
}
interface Pincode{
  district :string;
  state :string;
  key :number;
  value: string;
  description: string;
}
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
})
export class UserListComponent implements OnInit {
  baseUrl: string;
  progress: number;
  
  upload(files : any) {
    if (files.length === 0)
      return;
  
    const formData = new FormData();
  
    for (const file of files) {
      formData.append(file.name, file);
    }
  
    console.log(formData);
    const uploadReq = new HttpRequest('POST', GlobalConstants.apiURL + 'FileManagement/upload', formData, {
      reportProgress: true,
    });
  
    // this.http.request(uploadReq).subscribe((event: { type: HttpEventType; loaded: number; total: number; }) => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   };
    // });
  }


  //////////////////////////////////

  userList1: any;
  userData: any[] = [];

  lastkeydown1: number = 0;
  subscription: any;

     constructor(private router: Router,
     private http: HttpClient) { }
  ngOnInit() {
    
  }
  getUserIdsFirstWay($event : any) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length == 6) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.getPincodeList(userId)
        this.userList1 = this.searchFromArray(this.userData, userId);
        //this.getPincodeList(userId);
        //console.log("this.userList1"); console.log(this.userList1);
      }
    }
  }  

  searchFromArray(arr : any, regex : any) {
    console.log("arr"); console.log(arr);
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      //if (arr[i].match(regex)) {
        matches.push(arr[i]);
      //}
    }
    console.log("matches")
    console.log(matches)
    return matches;
  };

  pincodes: string[];
  pincode: Pincodedrodown[] = [];
  pincodeMaster: Pincode[] = [];
  getPincodeList(value : any) {
    const token = localStorage.getItem("jwt") as string;
       
            var reqHeader = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
          });
   
    this.http.get<any>(GlobalConstants.apiURL+'/MasterData/SearchPincode'+ `?pincode=` + value,{headers: reqHeader} )
    .subscribe(response => {
      
      
      // for(var i=0; i<response.length;i++){
      //   var pinL={ key :response[i].key ,viewValue : response[i].description } ;      
      //   this.pincode.push(pinL);
      //   this.pincodes = response[i].description;
      //   this.userList1 = response[i].description;
      // }
      for(var i=0; i<response.length;i++){
        var pinL2={ district :response[i].district ,state :response[i].state ,key :response[i].key ,value :response[i].value ,description : response[i].description } ;      
        this.pincodeMaster.push(pinL2)
      }
    //   console.log( this.pincode);
    //   console.log( this.pincodeMaster);
    Object.assign(this.userData, response);
    //Object.assign(this.userList1, response);
    
    console.log("this.userList1");
    console.log(this.userList1);
     })
  
    //return this.http.get('/src/app/data/users.json', { headers });
   }
}

 






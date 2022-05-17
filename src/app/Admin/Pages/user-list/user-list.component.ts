
import { HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/file-upload.service';
import { GlobalConstants } from 'src/app/GlobalConstants';


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
export class UserListComponent  {
  baseUrl: string;
  http: any;
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
  
    this.http.request(uploadReq).subscribe((event: { type: HttpEventType; loaded: number; total: number; }) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      };
    });
  }
}

 






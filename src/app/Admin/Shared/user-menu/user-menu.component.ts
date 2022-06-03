import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {MatDialog} from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { GlobalConstants } from 'src/app/GlobalConstants';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

	isOpen: boolean = false;
	data: any;
	Username :string = '';
	ProfileName:string="";
	ProfileRole:string="";
		
  
		@Input() currentUser = null;
		@HostListener('document:click', ['$event', '$event.target'])
		onClick(event: MouseEvent, targetElement: HTMLElement) {
		  if (!targetElement) {
			   return;
		  }
  
		  const clickedInside = this.elementRef.nativeElement.contains(targetElement);
		  if (!clickedInside) {
				this.isOpen = false;
		  }
		}
		
	  
		constructor(private elementRef: ElementRef,
					  private http: HttpClient, 
					  private router: Router,
					  public dialog: MatDialog,
					  private jwtHelper: JwtHelperService,) { }
  
  
		ngOnInit() {
			this.getname();
		}
  
  
		getname(){
		  const token = localStorage.getItem("jwt") as string;
		 
		  var reqHeader = new HttpHeaders({ 
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+ token
		 });
		  this.http.get<any>(GlobalConstants.apiURL+'/User/CurrentUser',{ headers: reqHeader } )
		  .subscribe(response => {
			console.log(response);			  
			this.ProfileRole=response.userTypeDescription;
			this.ProfileName=response.firstName +" "+response.lastName ;
			//this.ProfileName=response.email;
		  })
		  //const decrypt = this.jwtHelper.decodeToken(token) ;	
		  
		  
		}
		users() {
		  const dialogRef = this.dialog.open(UserProfileComponent, {
			  height: '400px',
			  width: '450px',
			});
	  
		  dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		  });
		  const token = localStorage.getItem("jwt") as string;
		  const decrypt = this.jwtHelper.decodeToken(token) ;
		   this.Username=decrypt.Email;
  
		  // this.http.get("http://localhost:5000/api/Users/Getusers", {
		  //  	headers: new HttpHeaders({
		  //  	  "Content-Type": "application/json"
		  //  	})
		  //    }).subscribe(response => {
		  //  	this.data = response;
		  //    }, err => {
		  //  	console.log(err)
		  //    });
		}
  
		public logOut = () => {
		  localStorage.removeItem("jwt");
		  this.router.navigate(['/Login']);
		}
  
  
		
	openDialog() {
	  const dialogRef = this.dialog.open(SettingsComponent, {
		  height: '500px',
		  width: '600px',
		});
  
	  dialogRef.afterClosed().subscribe(result => {
		console.log(`Dialog result: ${result}`);
	  });
	}

}

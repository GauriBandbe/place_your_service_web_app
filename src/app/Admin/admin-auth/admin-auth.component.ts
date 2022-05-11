import { Component, OnInit ,Input} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {

  @Input() isVisible : boolean = true;
  visibility = 'shown';

  sideNavOpened: boolean = true;
  matDrawerOpened: boolean = false;
  matDrawerShow: boolean = true;
  sideNavMode: string = 'side';

  ngOnChanges() {
   this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

	constructor(private media: MediaObserver,private jwtHelper: JwtHelperService,
     private router: Router) { }

	ngOnInit() {
		this.media.asObservable().subscribe(() => {
            this.toggleView();
        });
	}
    getRouteAnimation(outlet: { activatedRouteData: { animation: any; }; }) {

       return outlet.activatedRouteData.animation;
       //return outlet.isActivated ? outlet.activatedRoute : ''
    }

	toggleView() {
		if (this.media.isActive('gt-md')) {
            this.sideNavMode = 'side';
            this.sideNavOpened = true;
            this.matDrawerOpened = false;
            this.matDrawerShow = true;
        } else if(this.media.isActive('gt-xs')) {
            this.sideNavMode = 'side';
            this.sideNavOpened = false;
            this.matDrawerOpened = true;
            this.matDrawerShow = true;
        } else if (this.media.isActive('lt-sm')) {
            this.sideNavMode = 'over';
            this.sideNavOpened = false;
            this.matDrawerOpened = false;
            this.matDrawerShow = false;
        }
	}


  //user  Authenticated or not check here
  isUserAuthenticated() {

    //const token = localStorage.getItem("jwt") as string;
    //const decrypt = this.jwtHelper.decodeToken(token) ;

    // if (token && !this.jwtHelper.isTokenExpired(token) &&decrypt.Role =="Admin" ) {
    //   return true;
    // }

    // else {
    //   localStorage.removeItem("jwt");
    //   this.router.navigate(['/Login']);
    //   return false;
    // }
    return true;
  }
}

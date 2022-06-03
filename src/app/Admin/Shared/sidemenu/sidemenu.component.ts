import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserDetailsComponent } from '../../Pages/user-details/user-details.component';
 import { menus, Vendormenus } from './menu-element';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() iconOnly:boolean = false;

    public menus = menus;
    public Vmenus = Vendormenus;
    public usert = Number(localStorage.getItem("userTypeCode"));
   
    private path: string = "../../../assets/images/Sidemenu_icon";
    constructor(
      private domSanitizer: DomSanitizer, 
      public matIconRegistry: MatIconRegistry ) {
      this.matIconRegistry
      .addSvgIcon("Dashboard_Icon", this.setPath(`${this.path}/Dashboard_Icon.svg`))
      .addSvgIcon("Vendor_Icon", this.setPath(`${this.path}/Vendor_Icon.svg`))
      .addSvgIcon("Service_Icon", this.setPath(`${this.path}/Service_Icon.svg`));
    }
 private setPath(url: string): SafeResourceUrl { 
  return this.domSanitizer.bypassSecurityTrustResourceUrl(url); 
 }
    ngOnInit() {
    }
    
}

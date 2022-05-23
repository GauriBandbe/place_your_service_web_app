import { Component, Input, OnInit } from '@angular/core';
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
   
    constructor() { }

    ngOnInit() {
    }
    
}

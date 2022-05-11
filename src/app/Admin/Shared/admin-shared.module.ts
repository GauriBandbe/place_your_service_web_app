import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidemenuItemComponent } from './sidemenu-item/sidemenu-item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarNotificationComponent } from './toolbar-notification/toolbar-notification.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';




@NgModule({
  declarations: [ 
    SidemenuComponent,
    SidemenuItemComponent,
    ToolbarNotificationComponent,
    ToolbarComponent,
    FullscreenComponent,
    UserMenuComponent,
    SettingsComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SidemenuComponent,
    SidemenuItemComponent,
    ToolbarNotificationComponent,
    ToolbarComponent,
    FullscreenComponent,
    UserMenuComponent,
    SettingsComponent,
    UserProfileComponent,
],
})
export class AdminSharedModule { }

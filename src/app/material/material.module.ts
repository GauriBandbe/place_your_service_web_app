import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatChipsModule } from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import {MatExpansionModule} from '@angular/material/expansion';
import { ToastrModule } from 'ngx-toastr';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [],
  imports:[
    ToastrModule.forRoot({
      positionClass:'toast-top-right'
    })
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,   
    MatToolbarModule,
    MatListModule, 
    MatTableModule,
    MatCardModule,      
    MatProgressBarModule,    
    MatGridListModule,
    MatInputModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,  
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSlideToggleModule,
    BrowserAnimationsModule,
    NgScrollbarModule,
    MatChipsModule,
    MatStepperModule,
    TabsModule,
    FullCalendarModule,
    MatExpansionModule,
    ToastrModule,
    MatAutocompleteModule
  ],
  
  providers: [
    TabsetConfig],
})
export class MaterialModule { }

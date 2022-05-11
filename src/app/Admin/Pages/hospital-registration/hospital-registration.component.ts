import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthGuard } from 'src/app/Landing/Services/guards.service';
import { NotificationService } from 'src/app/Services/notification.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.scss']
})
export class HospitalRegistrationComponent implements OnInit {
   
  //  var latest_date =this.datepipe.transform(a, 'yyyy-MM-dd');

   // console.log(latest_date)
   public loginstarts :boolean =false;
    registerForm!: FormGroup;
    submitted = false;
    invaliddob : string | any;
    constructor(private router: Router,
        private formBuilder: FormBuilder, public datepipe: DatePipe,
        private act : AuthGuard , private route: ActivatedRoute,
        private notifyService : NotificationService ) { }

    todayDate:Date = new Date();
    latest_date =this.datepipe.transform(this.todayDate, 'yyyy-MM-dd');

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            RoleId: ['', Validators.required],
            Title: ['', Validators.required],
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            // validates date format yyyy-mm-dd
            Dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],        
            Email: ['', [Validators.required, Validators.email]],
        }
        // , {
        //     validator: MustMatch('password', 'confirmPassword')
        // }
                
        );
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    IsValid : string | any ;
    onSubmit() {

        this.submitted = true;
        var user = this.registerForm.value
        
        console.log(this.registerForm.value);    
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loginstarts=true;
        // display form values on success
       
        this.act.CreateTechnicianUser(this.registerForm.value).subscribe((data)=> 
                                                                        {
                                                                            console.log(data);
                                                                            if(data.message.status==true){
                                                                                Swal.fire({
                                                                                    text: "Hospital User Added Successfully!!!!",
                                                                                    icon: 'success'
                                                                                  });
                                                                                // this.notifyService.showSuccess(data.message.message, "Success")
                                                                            }
                                                                            else{
                                                                                Swal.fire({
                                                                                    text: data.message.message,
                                                                                    icon: 'error'
                                                                                  });
                                                                                // this.notifyService.showError(data.message.message, "Error")
                                                                            }
                                                                            this.loginstarts=false;
                                                                            this.onReset();       
                                                                        })
        
                                                                
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}

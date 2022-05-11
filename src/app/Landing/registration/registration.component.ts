import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { AuthGuard } from '../Services/guards.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    public loginstarts :boolean =false;
    registerForm: FormGroup;
    submitted = false;

    constructor(private location: Location,
        private notifyService : NotificationService , 
        private act : AuthGuard ,
        private formBuilder: FormBuilder ,  
        private datepipe: DatePipe, 
        private router: Router ) {
     }

    //  var date = new Date();
    //  var user = this.datepipe.transform(date,"yyyy-MM-dd");

    user = new Date();
    user1 = this.datepipe.transform(this.user,"yyyy-MM-dd");

    // public datepipe: DatePipe
    ngOnInit() { 

        this.registerForm = this.formBuilder.group({
            Title: ['', Validators.required],
            FirstName: ['', [Validators.required , Validators.minLength(2)]],
            LastName: ['', [Validators.required , Validators.minLength(2)]],
            // validates date format yyyy-mm-dd
            Dob: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            Phone: ['', [Validators.required , Validators.pattern("[0-9 ]{10}")]]}
        ,  {
            validator: this.MustMatch('Password', 'confirmPassword')
        }
        );
    }

    // maxDate:Date=new Date();
    // this.date=new Date();
    // let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.loginstarts=true;
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.act.PatientUserRegistration(this.registerForm.value).subscribe((data)=> {console.log(data);
            if(data.message.status==true){

                this.notifyService.showSuccess(data.message.message, "Success")
                this.loginstarts=false;
                this.onReset()
                this.router.navigate(['/login']);
            }

            else{

                this.notifyService.showError(data.message.message, "Error")
                this.loginstarts=false;
                this.onReset()
            }
        })
        console.log(this.registerForm.value);
       
        // display form values on success
        //alert("form is succefully submitted");
        //this.notifyService.showSuccess("Registration successfully!!!", "Success")

    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
    
            if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
    
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    login() {
        this.router.navigate(['/Login']);
      }
      
    BackToMain(): void {this.location.back()}

    
}


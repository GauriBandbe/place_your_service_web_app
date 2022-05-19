import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from './../Services/guards.service';
import {JwtHelperService} from '@auth0/angular-jwt'
import { NotificationService } from 'src/app/Services/notification.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
 
  param1 !: string;
  submitted = false;

  constructor(private router: Router,
    private fb: FormBuilder , private act : AuthGuard , private route: ActivatedRoute , private notificationservice : NotificationService) {
     
}

  jwthelper = new JwtHelperService();

  b : any="";
  setemail:any="";
  userValue !: FormGroup;
  formErrors = {
    'email': ''
  };
  user : string = '';
  isDisabled : boolean = true;

  ngOnInit() {

    this.b = this.route.snapshot.queryParamMap.get('k');
    const decrypt = this.jwthelper.decodeToken(this.b) ;
    console.log(decrypt.email);
    this.user  = decrypt.email;

    this.userValue = this.fb.group({
      token: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]}
  ,  {
      validator: this.MustMatch('Password', 'confirmPassword')
  }
  );
  } 

  OnSubmit(){
    console.warn(this.userValue.value)
  }

  Forgot() {
    this.router.navigate(['/ForgotPassword']);
  }
  get f() { return this.userValue.controls; }
  
  public ChangePassword()
  {
    if (this.userValue.invalid) {
      return;
  }
    this.submitted = true;
    var c = localStorage.getItem('token');
    
     
    if(this.b == c){
      this.act.ResetPassword(this.userValue.value).subscribe((data)=> {console.log(data);})
      //alert("You Can Now Login With New Password");
      this.notificationservice.showSuccess("You Can Now Login With New Password" , "Success")
      this.router.navigate(['/Login']);
     }
    
  }

  
  login() 
  {
    this.router.navigate(['/Login']);
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
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/Services/notification.service';
import { AuthGuard } from './../Services/guards.service';
//Sweet Alerts
import Swal from 'sweetalert2';
import { GlobalConstants } from 'src/app/GlobalConstants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isVisible: any=0;
  jwthelper = new JwtHelperService();
  public loginstarts :boolean =false;
  constructor(private router: Router,
    private fb: FormBuilder , private act : AuthGuard , private http:HttpClient ,private notificationservice : NotificationService) {
}

  setemail:any="";
  isemail!:boolean;
  userForm !: FormGroup;
  formErrors = {
    'email': '',
    'otp':''
  };

  Forgot() {
    this.router.navigate(['/ForgotPassword']);
  }

  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    }
  };

  // public Forgot_Password() : void
  // {
  //   this.loginstarts=true;
  //   this.act.SendForgotPasswordEmail(this.userForm.value)
  //   .subscribe(data=>
  //   {
  //     console.log(data)
  //     if(data==true)
  //      {
  //       // alert("Email send to Your Registered Email-Id successfully");
  //       this.notificationservice.showSuccess("Email send to Your Registered Email-Id successfully" , "Success")

  //       var b = localStorage.getItem('token');
  //       console.log(b);
  //       this.router.navigate(['/Login']);
  //      }
  //      else{
  //       this.isemail = true;
  //       this.notificationservice.showError("Invalid Email", "Invalid Login")
  //      }
  //     } , err => {
  //       this.notificationservice.showError("Invalid Email", "Invalid Login")
   
  //     })    
  // }
public Send_OTP() {
  this.isVisible=1;
  this.loginstarts=true;
  const form = this.userForm;
  this.http.post<any>(GlobalConstants.apiURL+'/Login/ForgetPassword' ,({"userName" :form.value.email,"passwordOTP":""}))
  .subscribe(response => {
    //get response after login sucessfully
    console.log("Get Otp");
    console.log(response);
    Swal.fire({
      text: "Otp sent to registered email ID...Please check your mail!!!",
      icon: 'success'
    })
    
  
  }, err => {


  setTimeout(() => 
  {
    this.loginstarts=false;
    Swal.fire({
      text: "'Not a valid email!",
      icon: 'warning'
    })
    
  },
  5000);

  })    
}
public Forgot_Password() : void{
  //this.isVisible=1;
  this.loginstarts=true;
  const form = this.userForm;
  console.log(form.value);
  this.http.post<any>(GlobalConstants.apiURL+'/Login/GetPassword' ,({"userName" :form.value.email,"passwordOTP":form.value.otp}))
  .subscribe(response => {
    //get response after login sucessfully
    console.log("Get pwd");
    console.log(response);
    
    Swal.fire({
      text: "Otp sent to registered email ID...Please check your mail!!!",
      icon: 'success'
    })
    this.router.navigate(['/Login']);
  
  }
  , err => {


  setTimeout(() => 
  {
    this.loginstarts=false;
    Swal.fire({
      text: "Couldn't Fetch Password. Please try again with correct OTP.",
      icon: 'warning'
    })
    
  },
  5000);

  }
  )    
}
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'otp': ['', [
      ]
      ],
    });
      
  }

  
  login() {
    this.router.navigate(['/Login']);
  }

 
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Headers, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/Services/notification.service';
//Sweet Alerts
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalConstants } from 'src/app/GlobalConstants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  jwthelper = new JwtHelperService();
  invalidLogin: boolean | undefined;
  userForm!: FormGroup;
  hide = true;
  public loginstarts :boolean =false;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private  notificationservice : NotificationService,
              private toastr: ToastrService) {
  }
//start function 
  ngOnInit() { 
     this.buildForm();
  }

//login form initialization 
  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
       // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(3),
        Validators.maxLength(25)
      ]
      ],
    });
    

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

//form values validate function
  onValueChanged(data?: any) {
   
  }
  
  //Login functions 
  login() 
  {
    this.loginstarts=true;
    const form = this.userForm;
   
    this.http.post<any>(GlobalConstants.apiURL+'/Login/Login' ,({"userName" :form.value.email,"password":form.value.password}))
          .subscribe(response => {
            //get response after login sucessfully
            const token = response;
            //const token = (<any>response).token;
            
          //   const role = (<any>response).role;
           //stored in local as session 
             localStorage.setItem("jwt", token);
             
          //   this.invalidLogin = false;
          //   this.loginstarts=false;
          const headers= new Headers();
          headers.append('Authorization', `Bearer `+token)
       
              var reqHeader = new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            });
            Swal.fire({
              text: "Login Sucessfully!!!",
              icon: 'success'
            })
           
            this.http.get<any>(GlobalConstants.apiURL+'/User/CurrentUser',{ headers: reqHeader } )
            .subscribe(response => {
              
                if(response.userTypeCode=="0" ||  response.userTypeCode=="1" || response.userTypeCode=="2"){
                  localStorage.setItem("userCode", response.userCode);
                  localStorage.setItem("userTypeCode", response.userTypeCode);
                  this.router.navigate(['/Admin/Dashboard']);
                  this.loginstarts=false;
              }
              else{
                Swal.fire({
                  text: "You are not authorized to access this application!",
                  icon: 'warning'
                })
                this.router.navigate(['/Login']);
                this.loginstarts=false;
              }
              
            })
           
          
          }, err => {


          setTimeout(() => 
          {
            this.loginstarts=false;
            this.invalidLogin = true;
            this.showToasterError();
          },
          5000);

        })
  
   
  }
///////////////////////////////

  //forgot password function redirection
  Forgot() {
    this.router.navigate(['/ForgotPassword']);
  }

   //change password function redirection
  ChangePassword() {
    this.router.navigate(['/ChangePassword']);
  }

   //Patient Registration form redirection
  Registration(){

    this.router.navigate(['/Registration']);

  }

  //email validations
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

//Toaster success message
  showToasterSuccess()
  {
    Swal.fire({
      text: "Login Sucessfully!!!",
      icon: 'success'
    })
    //this.notificationservice.showSuccess("Login Sucessfully!!!", "Login")
  }

//Toaster Error message
  showToasterError()
  {
    Swal.fire({
      text: "Invalid user name or password",
      icon: 'error'
    })
    this.loginstarts=false;
  }


}
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
    const tokenH = "";
    console.log(tokenH);
    if(tokenH != ""){

      console.log(form.value.email);
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImJhbmRiZS5nYXVyaTAxQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImJhbmRiZS5nYXVyaTAxQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6IlZlbmRvciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJCYW5kYmUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJWZW5kb3IiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjkxNTgxNTkyODciLCJSb2xlQ29kZSI6IjIiLCJleHAiOjE2ODMwMjIyNjQsImlzcyI6Imh0dHA6Ly9wbGFjZXlvdXJzZXJ2aWNld2ViYXBpLWRldi5hcC1zb3V0aC0xLmVsYXN0aWNiZWFuc3RhbGsuY29tLyIsImF1ZCI6Imh0dHA6Ly9wbGFjZXlvdXJzZXJ2aWNld2ViYXBpLWRldi5hcC1zb3V0aC0xLmVsYXN0aWNiZWFuc3RhbGsuY29tLyJ9.mnZG81hkGouWaFkHoJGcqbkP7cYB4moGsnSD9qMuyFQ";
      const role = (<any>token).role;
      localStorage.setItem("jwt", token);
      const token1 = localStorage.getItem("jwt") as string;
      const decrypt = this.jwthelper.decodeToken(token1) ;
      console.log(decrypt);
      Swal.fire({
        text: "Login Sucessfully!!!",
        icon: 'success'
      })
      if(decrypt.RoleCode=="2"){
          this.router.navigate(['/Admin/Dashboard']);
      }
      else{
        Swal.fire({
          text: "You are not authorized to access this application!",
          icon: 'warning'
        })
        this.router.navigate(['/Login']);
      }
    }
    else{

      
      this.http.post<any>('http://placeyourservicewebapi-dev.ap-south-1.elasticbeanstalk.com/api/Login/Login' ,({"userName" :form.value.email,"password":form.value.password}))
          .subscribe(response => {
            //get response after login sucessfully
            console.log("Else Blk");
            console.log(response);
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
            this.http.get<any>('http://placeyourservicewebapi-dev.ap-south-1.elasticbeanstalk.com/api/User/CurrentUser',{ headers: reqHeader } )
            .subscribe(response => {
              console.log(response);
                if(response.userTypeCode=="2"){
                  this.router.navigate(['/Admin/Dashboard']);
              }
              else{
                Swal.fire({
                  text: "You are not authorized to access this application!",
                  icon: 'warning'
                })
                this.router.navigate(['/Login']);
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
      //this.notificationservice.showError("Invalid user name or password", "Invalid Login")
  }

  //show and hide passwords
  togglepassword(){
    
  }
 

}
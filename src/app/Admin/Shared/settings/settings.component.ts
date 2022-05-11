import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/Services/notification.service';
//Sweet Alerts
import Swal from 'sweetalert2';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  pwChangeForm !: FormGroup;
  confirmvalidation : boolean =false;
  hide = true;
  hidetwo = true;
  hidethree=true;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private  notificationservice : NotificationService,
    private toastr: ToastrService ) {

     
     }

  ngOnInit(): void {
    this.buildForm();
  }



  buildForm() {

    this.pwChangeForm = this.fb.group({
      
      'PreviousPassword': ['', [
       // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ],
      'CurrentPassword': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
         Validators.minLength(6),
         Validators.maxLength(25),
         Validators.required
       ]  
       ],
       'confirmpassword': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
         Validators.minLength(6),
         Validators.maxLength(25),
         Validators.required
       ]  
       ],
       'UserName': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
         Validators.minLength(6),
         Validators.maxLength(25)
       ]  
       ]
    } );

    this.pwChangeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any){
    const form = this.pwChangeForm;
    if(form.value.CurrentPassword !="" &&
    form.value.CurrentPassword !=form.value.confirmpassword &&
    form.value.confirmpassword !="")
    {
      this.confirmvalidation=true;
    }
    else
    {
      this.confirmvalidation=false;
    }
  }

  ChangePassword() 
  {
    const token = localStorage.getItem("jwt") as string;
    

    const decrypt = this.jwtHelper.decodeToken(token) ;
    const form = this.pwChangeForm;
    this.pwChangeForm.value.UserName=decrypt.Email;
    

    
    this.http.post<any>("http://localhost:5000/api/auth/ChangePasword", form.value, {
			headers: new HttpHeaders({
			  "Content-Type": "application/json"
			})
		  }).subscribe(response => {
        console.log(response);

        if(response.code==200){
          Swal.fire(
            'Success',
            response.message,
            'success'                
          )
    
        }
        else{
          Swal.fire({

            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
           
          })
        }
        
		  }, err => 
      {
        Swal.fire({

          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
         
        })
          console.log(err);
          //this.showToasterError();
		  });

    
  }

  showToasterSuccess()
  {
    this.notificationservice.showSuccess("Password Changed successfully !!", "Success")
  }

  showToasterError()
  {
      
      this.notificationservice.showError("Invalid password", "Invalid Login")
  }
}
function ConfirmedValidator(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}


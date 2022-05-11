import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';
export interface IUserDetails{
  userId :number;
  firstName:string;
  lastName:string;
  dob:string;
  phone:string;
  email:string;
  title:string;
  roleId:number;
}
//Sweet Alerts
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  id :string ="";
  submitted = false;
  UsersRole=false;
  firstFormGroup: FormGroup;
  UserDetails :IUserDetails;
  public apistarts :boolean =false;
  constructor(private route : ActivatedRoute, 
    private router : Router,
    private act : AdminService ,
    private _formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.GetUsersDetail();

    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required,Validators.minLength(2)]],
      lastName: ['', [Validators.required,Validators.minLength(2)]],
      dob: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      roleId:['']
       
    });
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
   //Get Personal datas
   GetUsersDetail()
   {   
 
    this.id=String(this.route.snapshot.paramMap.get('id'));
    let queryParams = new HttpParams().append("Userkey",this.id);
     
     this.act.GetUserDetails(queryParams).subscribe(data =>
      {
       const datas = (<any>data).data;
       console.log(datas);
      
        this.UserDetails=datas;
        console.log(this.UserDetails);
      this.firstFormGroup.patchValue({
         firstName: this.UserDetails.firstName,
          lastName:this.UserDetails.lastName,
          dob: this.UserDetails.dob,
          email: this.UserDetails.email,
          phone:this.UserDetails.phone,
          title:this.UserDetails.title,
          roleId:this.UserDetails.roleId
     
      });
       if(this.UserDetails.roleId !=4){
        this.UsersRole=true;
       }
 
     }, err=> {
       
      console.log(err);
      });
   }

   userdetailsSubmit()
  {
    this.apistarts=true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.firstFormGroup.invalid)
    {
      return; 
    }
    
    const form = this.firstFormGroup;
    form.value.userKey=String(this.route.snapshot.paramMap.get('id'));
    
    this.act.UserDetailsSubmit(form.value).subscribe(response => 
    {
      const token = (<any>response).token;
      const datas = (<any>response).data;
      console.log(datas);
      this.apistarts=false;
      Swal.fire(
        'Success',
        datas.message,
        'success'                
      )

     }, err => {

      Swal.fire({

        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })
      
     })


  }
 
}

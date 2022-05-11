import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})

export class DiagnosisComponent implements OnInit {
  
  @Output() sendSignForm = new EventEmitter<void>();
  public form: FormGroup | any;

  constructor(@Inject(DOCUMENT) private domDocument: Document,private MasterdataService : MasterdataServiceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Dcode: new FormControl('', [Validators.required]),
      DDescription: new FormControl('', [Validators.required]),
      IsDepricated: new FormControl('', [Validators.required])
    });
   
  }
  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.MasterdataService.AddDiagnosisData(this.form.value).subscribe(responce=>{
      console.log(responce);
      if(responce.message.status==true) {
        Swal.fire({
        text: responce.message.message,
        icon: 'success'
      })
      setTimeout(() => {this.domDocument.location.reload()}, 1000);
    }
      else{
        Swal.fire({
          text: responce.message.message,
          icon: 'error'
        })
        setTimeout(() => {this.domDocument.location.reload()}, 1000);
      }
    })
    console.log(this.form.value)
  }


}

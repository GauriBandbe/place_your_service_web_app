import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<void>();
  public form: FormGroup | any;

  constructor(@Inject(DOCUMENT) private domDocument: Document,private MasterdataService : MasterdataServiceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Pcode: new FormControl('', [Validators.required]),
      PDescription: new FormControl('', [Validators.required]),
      Pisdepricated: new FormControl('', [Validators.required])
    });
   
  }
  public sign(): void {
    if (this.form.invalid) {
      return;
    }
    this.MasterdataService.AddProcedureData(this.form.value).subscribe(responce=>{
      console.log(responce);
      if(responce.message.status==true) {
        Swal.fire({
        text: responce.message.message,
        icon: 'success'
      })
      // this.form.reset();
      setTimeout(() => {this.domDocument.location.reload()}, 1000);
    }
      else{
        Swal.fire({
          text: responce.message.message,
          icon: 'error'
        })
        // this.form.reset();
        setTimeout(() => {this.domDocument.location.reload()}, 1000);
      }
    })
    console.log(this.form.value)
  }
  
}

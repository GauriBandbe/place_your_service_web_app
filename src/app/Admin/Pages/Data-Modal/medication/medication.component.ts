import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<void>();
  public form: FormGroup | any;

  constructor(@Inject(DOCUMENT) private domDocument: Document,private MasterdataService : MasterdataServiceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      drug_id: new FormControl('', [Validators.required]),
      drug_name: new FormControl('', [Validators.required]),
      drug_generic_name: new FormControl('', [Validators.required]),
      drug_brand_name: new FormControl('', [Validators.required]),
      drug_form: new FormControl('', [Validators.required]),
      drug_strength: new FormControl('', [Validators.required])
    }); 
  }
  public sign(): void {
    if (this.form.invalid) {
      return;
    }
    this.MasterdataService.AddDrugData(this.form.value).subscribe(responce=>{
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

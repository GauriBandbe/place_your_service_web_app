import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterdataServiceService } from 'src/app/Services/masterdata-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.scss']
})
export class AllergyComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<void>();
  public form: FormGroup | any;

  constructor(@Inject(DOCUMENT) private domDocument: Document,private MasterdataService : MasterdataServiceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      aid: new FormControl('', [Validators.required]),
      allergy_type: new FormControl('', [Validators.required]),
      allergy_name: new FormControl('', [Validators.required]),
      allergy_source: new FormControl('', [Validators.required]),
      allerginicity: new FormControl('', [Validators.required]),
      iso_forms_of_partial_of_allergen: new FormControl('', [Validators.required]),
    }); 
  }
  public sign(): void {
    if (this.form.invalid) {
      return;
    }
    this.MasterdataService.AddAllergyData(this.form.value).subscribe(responce=>{
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

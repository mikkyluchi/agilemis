import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-add-priority-mda',
  templateUrl: './add-priority-mda.component.html',
  styleUrls: ['./add-priority-mda.component.scss']
})
export class AddPriorityMdaComponent implements OnInit {
  data: any;
  postData: any = { states: [] };
  title;
  userObj: any;
  onClose: any;
  mdaForm: FormGroup;
  ministries: any;
  selectedItems = [];
  constructor(private fb: FormBuilder, private toastr: ToastrService, public activeModal: BsModalRef, private router: Router) {
  }

  ngOnInit() {
    this.title = this.data.title;
    this.onClose = new Subject();
    this.getAllMda()
    this.mdaForm = this.fb.group({
      mdas: ['', [Validators.required]]
    })
    $(document).ready(function () {
      $('.js-example-basic-multiple').select2();

    });

  }

  onItemSelect(item: any) {
    this.mdaForm.value.mdas = []
    this.selectedItems.forEach(e => {
      this.mdaForm.value.mdas.push(e.id)
    });

    //console.log(this.mdaForm.value.mdas);
    
  }
  
  onItemDeSelect(item:any){
    this.mdaForm.value.mdas = []
    this.selectedItems.forEach(e => {
      this.mdaForm.value.mdas.push(e.id)
    });
  }

  get mdasFormData() {
    return {
      mdas: this.mdaForm.get('mdas')
    }
  }

  create() {
  }

  getAllMda() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-mandate',
  templateUrl: './create-mandate.component.html',
  styleUrls: ['./create-mandate.component.scss']
})
export class CreateMandateComponent implements OnInit {
  // @Input() data;
  data: any;
  postData: any = { states: [] };
  submit: any;
  sh: any;
  states: any;
  title;
  userObj: any;
  ministries: any;
  mandateForm: FormGroup;
  onClose: any;
  priorities;
  outputs;
  mdas = JSON.parse(localStorage.getItem('mdas'));
  constructor(private fb: FormBuilder, private toastr: ToastrService, public activeModal: BsModalRef, private router: Router) { }

  ngOnInit() {
    this.getUserObj();
    this.initiateForm();
    this.getPrioritiesMain();
    this.onClose = new Subject();
  }

  initiateForm() {
    if (this.data) {
      this.mandateForm = this.fb.group({
        title: ['', [Validators.required]],
        mdaId: this.data.mdaId,
        outputId: this.data.outputId,
        priorityId: this.data.priorityId
      })
    }
    
    this.mandateForm = this.fb.group({
      title: ['', [Validators.required]],
      mdaId: ['', [Validators.required]],
    })

  }

  get mandateFormData() {
    return this.mandateForm.value
  }

  create() {

    this.submit = true;
  }

  getUserObj() {
    this.userObj = JSON.parse(localStorage.getItem('user'))
  }

  setOutput(){
    console.log(this.mandateForm.value.priorityId);
    
    this.outputs = this.priorities.filter(e => e.id === this.mandateForm.value.priorityId);
    console.log(this.outputs)
  }

  getPrioritiesMain() {

  }
}

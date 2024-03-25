import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'edit-cc-ouput',
  templateUrl: './edit-cc-ouput.component.html',
  styleUrls: ['./edit-cc-ouput.component.scss']
})
export class EditCcOuputComponent implements OnInit {
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
  change = false;
  currentMinistry: any;
  id: any;
  constructor(private fb: FormBuilder, private toastr: ToastrService, public activeModal: BsModalRef, private router: Router) {

  }

  ngOnInit() {
    this.mandateForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
    })

    this.title = this.data.title;
    this.onClose = new Subject();
    $(document).ready(function () {
      $('.js-example-basic-multiple').select2();

    });
    this.getAllMda()

  }

  get mandateFormData() {
    return this.mandateForm.controls;
  }

  create() {
    this.mandateForm.value.id = this.data.id;
    this.submit = true;
  }


  getAllMda() {
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first, Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'add-cc-ouput',
  templateUrl: './add-cc-ouput.component.html',
  styleUrls: ['./add-cc-ouput.component.scss']
})
export class AddCcOuputComponent implements OnInit {
  data: any;
  sub_components: any;
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
  constructor(private fb: FormBuilder, private toastr: ToastrService, public activeModal: BsModalRef, private router: Router, private crud: CrudService) { }

  ngOnInit() {
    this.initiateForm();
    this.onClose = new Subject();
  }

  initiateForm() {
    this.mandateForm = this.fb.group({
      title: ['', Validators.required],
      cross_cutting_issue_id: this.data?.id,
      distributions: this.fb.array([])
    })
  }

  addComponent(){
    const outputForm = this.fb.group({
      sub_component_id: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.components.push(outputForm);
  }

  get components() {
    return this.mandateForm.controls["distributions"] as FormArray;
  }

  get mandateFormData() {
    return this.mandateForm.value
  }

  create() {
    this.submit = true;
    console.log(this.mandateForm.value)

    if(this.mandateForm.invalid){
      return;
    }

    this.crud.postAuthData('issues-outputs', this.mandateForm.value).pipe(first()).subscribe(
      (res) => {
        this.toastr.success("Output successful Created");
        this.activeModal.hide();
        this.onClose.next(false);
      },
      (err) => {
        this.toastr.error(err.message || 'Failed to create output, try again')
      }
    )
  }

}

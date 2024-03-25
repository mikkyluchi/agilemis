import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
@Component({
  selector: 'app-assign-deliverable',
  templateUrl: './assign-mandate.component.html',
  styleUrls: ['./assign-mandate.component.scss']
})
export class AssignDeliverableComponent implements OnInit {
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
  searchControl: FormControl;
  availMandates: any = [];
  @ViewChild('input') input: ElementRef;
  checking: boolean;
  constructor(private fb: FormBuilder, private toastr: ToastrService, public activeModal: BsModalRef, private router: Router) { }

  ngOnInit() {
    this.getUserObj();
    this.initiateForm();
    this.getPrioritiesMain();
    this.onClose = new Subject();

    // this.searchControl.valueChanges
    //   .pipe(debounceTime(100))
    //   .subscribe(search => {
    //     console.log(search);

    //     this.search(search);
    //     // this.setFilteredItems(search);
    //   });
  }
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        // filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((text) => {
          this.search(this.input.nativeElement.value)
        })
      )
      .subscribe();
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
  search(search) {
    console.log(search);
    this.checking = true
    this.submit = true;
  }

  assign(item) {

  }

  create() {
    this.submit = true;
  }

  getUserObj() {
    this.userObj = JSON.parse(localStorage.getItem('user'))
  }

  setOutput() {
    console.log(this.mandateForm.value.priorityId);

    this.outputs = this.priorities.filter(e => e.id === this.mandateForm.value.priorityId);
    console.log(this.outputs)
  }

  getPrioritiesMain() {}
}

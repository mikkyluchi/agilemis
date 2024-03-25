import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-edit-leading',
  templateUrl: './edit-leading.component.html',
  styleUrls: ['./edit-leading.component.css']
})
export class EditLeadingComponent implements OnInit {
  data: any = {};
  postData: any = {};
  submit: any;
  sh: any;
  states: any;
  title;
  userObj: any;
  onClose: any;
  mdas: any;
  tree: any;
  driver: any;
  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private router: Router, private crud: CrudService) {}

  ngOnInit() {
    this.title = this.data.title;
    this.onClose = new Subject();
    this.postData = this.data;
  }

  create(data) {
    this.submit = true;
    this.crud.putAuthData(`outcomes/${this.postData.id}`, this.postData).subscribe(
      res => {
        this.activeModal.hide();
        this.onClose.next(false);
        this.toastr.success("Main Outcome successful Updated");
      },
      error =>{
        this.toastr.error(error?.message);
      }
    )
  }

  getUser() {
    this.userObj = JSON.parse(localStorage.getItem('user'))
    return this.userObj;
  }
}

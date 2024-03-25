import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-edit-outcomes',
  templateUrl: './edit-outcomes.component.html',
  styleUrls: ['./edit-outcomes.component.css']
})
export class EditOutcomesComponent implements OnInit {
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
  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private router: Router, private crud: CrudService) {


  }

  ngOnInit() {
    this.title = this.data.title;
    this.onClose = new Subject();
    this.postData = this.data;
    this.prepareTarget();
    this.mdas = JSON.parse(localStorage.getItem('mdas'))
  }

  prepareTarget() {
    let target = JSON.parse(this.postData.target)
    this.postData.targetYear1 = target[0].target;
    this.postData.targetYear2 = target[1].target
    this.postData.targetYear3 = target[2].target
    this.postData.targetYear4 = target[3].target
  }
  create(data) {
    this.submit = true;
    this.crud.putAuthData(`sub-outcomes/${this.postData.id}`, this.postData).subscribe(
      res => {
        this.activeModal.hide();
        this.onClose.next(false);
        this.toastr.success("Outcome successful Updated");
      },
      error =>{
        this.toastr.error(error?.message);
      }
    )
  }
  calculateTarget() {
  //   //console.log('calculating')
  //   if (this.postData.type == 'quantitative') {
  //     let base = (parseInt(this.postData.targetYear1) - parseInt(this.postData.baseline)) / 4;
  //     //console.log(base);

  //     this.postData.targetYear1 = parseInt(this.postData.baseline) + (base * 1);
  //     this.postData.targetYear2 = parseInt(this.postData.baseline) + (base * 2);
  //     this.postData.targetYear3 = parseInt(this.postData.baseline) + (base * 3);
  //     this.postData.targetYear4 = parseInt(this.postData.baseline) + (base * 4);
  //     //console.log(parseInt(this.postData.baseline) + (base * 4));

  //   }
  }
  getUser() {
    this.userObj = JSON.parse(localStorage.getItem('user'))
    return this.userObj
  }
}

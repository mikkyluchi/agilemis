import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'create-sub-output',
  templateUrl: './create-sub-output.component.html',
  styleUrls: ['./create-sub-output.component.scss']
})
export class CreateSubOutputComponent implements OnInit {
  data: any;
  type: any = '';
  postData: any = { target_distributions: [] };
  submit: any;
  sh: any;
  states: any;
  title;
  userObj: any;
  onClose: any;
  mdas: any;
  sub_pdos: any;
  sub_outcomes: any;

  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private router: Router, private crud: CrudService) {
  }

  ngOnInit() {
    this.title = this.data.title;
    this.onClose = new Subject();
    this.states.forEach(e => {
      this.postData.target_distributions.push({
        state_id : e.id,
        target: 0,
        baseline: 0
      })
    });
  }
  create() {
    if(Math.round(this.checkTotal().baseline) != this.postData.baseline)
      return alert(`Total baseline distribution (${Math.round(this.checkTotal().baseline)}) is not equal to indicator's baseline (${this.postData.baseline})`)
    if(Math.round(this.checkTotal().target) != this.postData.target)
      return alert(`Total target distribution (${Math.round(this.checkTotal().target)}) is not equal to indicator's target (${this.postData.target})`)
    this.postData.output_id = this.data.id;
    this.crud.postAuthData(`sub-outputs`, this.postData).subscribe(
      res => {
        this.toastr.success("Sub Output successful Created");
        this.activeModal.hide();
        this.onClose.next(false);
      },
      error =>{
        this.toastr.error(error?.message);
      }
    )
  }

  calcDistributionBaseline(){
    if (this.postData.baseline < 1 || !this.postData.baseline)
      return;
    const res = this.postData.baseline / this.states.length;

    this.postData.target_distributions.forEach(e => {
      e.baseline = res.toFixed(2);
    });
  }

  calcDistributionTarget(){
    if (this.postData.target < 1 || !this.postData.target)
      return;
    const res = this.postData.target / this.states.length;
    this.postData.target_distributions.forEach(e => {
      e.target = res.toFixed(2);
    });
  }

  checkTotal(){
    let baseline = 0;
    let target = 0;
    this.postData.target_distributions.forEach(e => {
      baseline = baseline + +e.baseline;
      target = target + +e.target;
    });
    console.log({baseline, target})
    return {baseline, target}
  }

  getUser() {
    this.userObj = JSON.parse(localStorage.getItem('user'))
    return this.userObj
  }
}

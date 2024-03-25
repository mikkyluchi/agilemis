import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-edit-outputs',
  templateUrl: './edit-outputs.component.html',
  styleUrls: ['./edit-outputs.component.css']
})
export class EditOutputsComponent implements OnInit {
  data: any;
  type: any = '';
  postData: any;
  submit: any;
  sh: any;
  states: any;
  distributions: any;
  title;
  userObj: any;
  onClose: any;
  mdas: any;
  pdos: any;
  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private router: Router, private crud: CrudService) {
  }

  ngOnInit() {
    this.title = this.data.title;
    this.onClose = new Subject();
    this.postData = this.data;
    this.postData.target_distributions = [];
    this.mdas = JSON.parse(localStorage.getItem('mdas'))
    this.states.forEach(e => {
      this.postData.target_distributions.push({
        state_id : e.id,
        ouid: this.distributions.filter(i => i.state_id == e.id)[0].ouid,
        target: this.distributions.filter(i => i.state_id == e.id)[0].target,
        baseline: this.distributions.filter(i => i.state_id == e.id)[0].baseline
      })
    });
    console.log(this.postData)
  }
  create() {
    if(Math.round(this.checkTotal().baseline) != this.postData.baseline)
      return alert(`Total baseline distribution (${Math.round(this.checkTotal().baseline)}) is not equal to indicator's baseline (${this.postData.baseline})`)
    if(Math.round(this.checkTotal().target) != this.postData.target)
      return alert(`Total target distribution (${Math.round(this.checkTotal().target)}) is not equal to indicator's target (${this.postData.target})`)


    this.crud.putAuthData(`outputs/${this.data.id}`, this.postData).subscribe(
      res => {
        this.activeModal.hide();
        this.onClose.next(false);
        this.toastr.success("Output successful updated");
      },
      error =>{
        this.toastr.error(error?.message);
      }
    )
  }

  calculateDistribution(){

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

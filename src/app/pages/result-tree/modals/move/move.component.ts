import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {
  indicators: any;
  ind: any;
  data: any;
  postData: any = {};
  onClose: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService, public activeModal: BsModalRef, private router: Router) {
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    //console.log(this.ind);

    this.postData.outputId = this.data.id
    this.postData.indicatorId = this.ind;
    //console.log(this.postData);


  }
  move() {
  }
}

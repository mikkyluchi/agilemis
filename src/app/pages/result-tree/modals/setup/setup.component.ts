import { Component, OnInit, Input } from '@angular/core';

import { trigger, transition, useAnimation } from "@angular/animations";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  step: any = 1;
  page:any = 1;
  ft: any;
  data: any;
  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private router: Router) { }

  ngOnInit() {
//console.log(this.data);

  }
  create() {

  }
}
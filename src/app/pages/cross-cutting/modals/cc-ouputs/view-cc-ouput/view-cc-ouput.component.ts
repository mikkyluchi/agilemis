import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-cc-ouput',
  templateUrl: './view-cc-ouput.component.html',
  styleUrls: ['./view-cc-ouput.component.scss']
})
export class ViewCcOuputComponent implements OnInit {
  data: any;

  constructor(public activeModal: BsModalRef) { }

  ngOnInit(): void {
  }

}

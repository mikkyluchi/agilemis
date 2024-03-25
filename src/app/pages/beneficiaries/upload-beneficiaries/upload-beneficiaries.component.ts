import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'upload-beneficiaries',
  templateUrl: './upload-beneficiaries.component.html',
  styleUrls: ['./upload-beneficiaries.component.scss']
})
export class UploadBeneficiariesComponent implements OnInit {
  data: any;
  states: any;
  sub_components: any;
  constructor(public activeModal: BsModalRef) { }

  ngOnInit(): void {
  }

}

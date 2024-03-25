import { Component, OnInit, Input } from '@angular/core';



import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kra-outputs',
  templateUrl: './kra-outputs.component.html',
  styleUrls: ['./kra-outputs.component.css']
})
export class KraOutputsComponent implements OnInit {
  data: any;
  type: any;
  postData: any = { states: [] };
  submit: any;
  sh: any;
  states: any;
  fb: any;
  rb: any;
  rt: any;
  ft: any;
  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private router: Router) { }

  ngOnInit() {
    //console.log(this.data);
    this.postData = this.data
    if (this.type == 'output') {

      this.fb = (typeof this.postData.fb === 'undefined') ? {} : this.postData.fb;
      this.rb = (typeof this.postData.rb === 'undefined') ? {} : this.postData.rb;
      this.rt = (typeof this.postData.resultT === 'undefined') ? {} : this.postData.resultT;
      this.ft = (typeof this.postData.financeT === 'undefined') ? {} : this.postData.financeT;

    }
  }
  create() {
    this.submit = true;
    // this.postData.date  = this.ngbDateParserFormatter.format(this.postData.date);

    // this.api.createOutcomes(this.postData).subscribe((res) => {
    //   if (res['status'] == 'success') {
    //     this.submit = false
    //     this.toastr.success(res['message'], 'Success!');
    //     // this.router.navigate(['/dashboard']);
    //     // this.activeModal.close();
    //   }
    // }, (err) => {
    //   //console.log(err);
    //   this.submit = false
    // })
  }
}
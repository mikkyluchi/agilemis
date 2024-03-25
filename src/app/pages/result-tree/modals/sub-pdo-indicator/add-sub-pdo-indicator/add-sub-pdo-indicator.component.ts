import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';


@Component({
  selector: 'app-create-outcomes',
  templateUrl: './add-sub-pdo-indicator.component.html',
  styleUrls: ['./add-sub-pdo-indicator.component.css']
})
export class AddSubPdoIndicatorComponent implements OnInit {
  // @Input() data;
  data: any;
  postData: any = { states: [] };
  submit: any;
  sh: any;
  states: any;
  title;
  userObj: any;
  onClose: any;
  mdas: any;
  tree: any;

  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private router: Router, private crud: CrudService) {}
  ngOnInit() {
    this.title = this.data.title;
    this.onClose = new Subject();
    this.mdas = JSON.parse(localStorage.getItem('mdas'))
  }

  create(data) {
    this.submit = true;
    this.postData.pdo_indicator_id = this.data.id;
    this.crud.postAuthData('sub-pdo-indicators', this.postData).subscribe(
      res => {
        this.toastr.success("Sub PDO successful Created")
        this.activeModal.hide()
        this.onClose.next(false);
      },
      error =>{
        this.toastr.error(error?.message)
      }
    )
  }

  getUser() {
    this.userObj = JSON.parse(localStorage.getItem('user'))
    return this.userObj
  }

  calculateTarget() {
    if (this.postData.type == 'quantitative') {
      let base = (parseInt(this.postData.targetYear1) - parseInt(this.postData.baseline)) / 4;
      this.postData.targetYear1 = parseInt(this.postData.baseline) + (base * 1);
      this.postData.targetYear2 = parseInt(this.postData.baseline) + (base * 2);
      this.postData.targetYear3 = parseInt(this.postData.baseline) + (base * 3);
      this.postData.targetYear4 = parseInt(this.postData.baseline) + (base * 4);
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';


@Component({
  selector: 'app-create-leading',
  templateUrl: './create-pdo-indicator.component.html',
  styleUrls: ['./create-pdo-indicator.component.css']
})
export class CreatePdoIndicatorComponent implements OnInit {
  // @Input() data;
  data: any;
  postData: any = {};
  submit: any;
  sh: any;
  title;
  userObj: any;
  onClose: any;
  constructor(private toastr: ToastrService, public activeModal: BsModalRef, private crud: CrudService) {}

  ngOnInit() {
    this.title = this.data.title;
    this.onClose = new Subject();
  }

  create(data) {
    this.submit = true;
    this.crud.postAuthData('pdo-indicators', this.postData).subscribe(
      res => {
        this.toastr.success("Outcome successful Created")
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

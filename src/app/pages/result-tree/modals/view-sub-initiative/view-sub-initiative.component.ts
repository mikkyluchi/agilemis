import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-sub-initiative',
  templateUrl: './view-sub-initiative.component.html',
  styleUrls: ['./view-sub-initiative.component.scss']
})
export class ViewSubInitiativeComponent implements OnInit {
  data: any;
  si: any;
  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
    console.log(this.data);

    if (this.data.si)
      this.si = JSON.parse(this.data.si);
    console.log(this.si);
  }
  delete(val) {
    let index = this.si.indexOf(val);
    console.log(index);
    let r = confirm("Are you want to delete this sub!");
    if (r == true) {



      this.si.splice(index, 1);
      console.log(this.si);

    } else {
      return
    }
  }
  edit() {

  }
}

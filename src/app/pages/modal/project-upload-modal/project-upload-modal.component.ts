import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';
import * as XLSX from "xlsx";
import { WorkSheet } from "xlsx";


@Component({
  selector: 'project-upload-modal',
  templateUrl: './project-upload-modal.component.html',
  styleUrls: ['./project-upload-modal.component.scss']
})
export class ProjectUploadModalComponent implements OnInit {
  data: any;
  postData: any = {};
  submit: any;
  sh: any;
  title;
  userObj: any;
  onClose: any;
  fileName: any;
  projectData: any;

  states: any;
  components: any;
  outputs: any
  categories: any
  permanentCategories: any;
  lgas: any
  plans: any
  sub_components: any
  sub_component_id: any
  state_id
  selectedState: any;
  lga_id;
  constructor(private crud: CrudService, private toastr: ToastrService, public activeModal: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  setLGAS(){
    this.selectedState = this.states.find(e => e.id == this.state_id);
  }

  onfilechange(event: any) {
    const file = event.target.files[0];
    this.fileName = file.name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const arrayBuffer: any = fileReader.result;
      const data = new Uint8Array(arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, { type: "binary" });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet: WorkSheet = workbook.Sheets[first_sheet_name];
      console.log(worksheet);
      this.projectData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
      event.target.value = "";
    };
  }

  createProject() {
    this.projectData.forEach(e => {
      e.lga_id = this.lga_id;
      e.cost = e.cost + '';
      e.loc = e.level_of_completion;
      e.sub_component_id = this.sub_component_id;
      delete e.level_of_completion;
    })
    this.crud
      .postAuthData('projects/bulk/uploads', {projects: this.projectData})
      .subscribe((res: any) => {
        this.toastr.success(res?.payload);
        this.activeModal.hide()
        this.onClose.next(false);
      },
      (error: any) => {
        console.log(error)
        alert(error?.error?.payload)
      });
  }

  filterCategories(data){
    this.categories = this.permanentCategories.filter(e => e.sub_component_id == data.value)
  }
}

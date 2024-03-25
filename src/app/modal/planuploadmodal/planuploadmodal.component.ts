import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';
import * as XLSX from "xlsx";
import { WorkSheet } from "xlsx";

@Component({
  selector: 'planuploadmodal',
  templateUrl: './planuploadmodal.component.html',
  styleUrls: ['./planuploadmodal.component.scss']
})
export class PlanuploadmodalComponent implements OnInit {
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
  user;
  is_state_user = false;

  constructor(private crud: CrudService, private toastr: ToastrService, public activeModal: BsModalRef) { 
    this.user = JSON.parse(sessionStorage.getItem("user"));
    
  }
  

  ngOnInit(): void {
    this.onClose = new Subject();
    if(this.containsKeyValue(this.user.roles, 'name', 'state')){
      this.is_state_user = true;
      this.state_id = JSON.parse(sessionStorage.getItem("state_id"));
      this.setLGAS();
    }
     
  }
  containsKeyValue(array, key, value) {
    return array.some(obj => obj[key] === value);
  }
  setLGAS(){
    console.log(this.states)
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
      
      this.projectData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
      console.log(this.projectData);
      event.target.value = "";
    };
  }

  createProject() {
    this.projectData.forEach(e => {
      e.lga_id = this.lga_id;
      e.cost = e.cost + '';
      e.loc = e.level_of_completion;
      e.sub_component_id = this.sub_component_id;
    })

    // this.crud
    //   .postAuthData('projects/bulk/uploads', {projects: this.projectData})
    //   .subscribe((res: any) => {
    //     this.toastr.success(res?.payload);
    //     this.activeModal.hide()
    //     this.onClose.next(false);
    //   },
    //   (error: any) => {
    //     console.log(error)
    //     alert(error?.error?.payload)
    //   });
  }

  filterCategories(data){
    this.categories = this.permanentCategories.filter(e => e.sub_component_id == data.value)
  }
}

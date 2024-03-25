import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import * as XLSX from "xlsx";
import { WorkSheet } from "xlsx";

@Component({
  selector: 'beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  total_students = 0;
  number_of_grieviances=0;
  primary_six = 0;
  secondary_schools = 0;
  states: any;
  beneficiaries: any;
  subComponents: any;
  sub_component_id: any;
  fileName: any;
  selectedState: any;
  lga_id: any;
  beneficiariesData: any;
  state_id;
  projectId = '';
  has_added_students = false;
  record:any;
  constructor(private crud: CrudService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getBeneficiaries();
    this.getStates();
    this.getComponents();
    this.getStudentInStates();
  }

  getBeneficiaries(){
    this.crud.getAuthData('beneficiaries').subscribe(
      (res:any) => {
        this.beneficiaries = res?.payload
      },
      (error: any) => {
      }
    )
  }

  getStates(){
    this.crud.getAuthData('states?lgas').subscribe(
      (res:any) => {
        this.states = res?.payload
      },
      (error: any) => {
      }
    )
  }

  getComponents(){
    this.crud.getAuthData('sub-components').subscribe((res: any) => {
      this.subComponents = res.payload
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
    });
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
      const reportData = XLSX.utils.sheet_to_json(worksheet, {header: [
        "school_name",
        "EMIS_code",
        "principal_name",
        "principal_phone",
        "fullname",
        "gender",
        "dob",
        "class",
        "critical_life_skills_training_recieved",
        "critical_life_skills_learnt",
        "digital_literacy_skills_training_recieved",
        "digital_literacy_skills_learnt",
        "scholarship_recieved",
        "scholarship_tranches_recieved",
        "bank",
        "caregiven_fullname",
        "caregiven_phone",
        "caregiven_bnv_nin_voter_id",
        "caregiven_address",
        "head_teacher_name",
        "head_teacher_phone",
        "enumerator",
        "enumerator_phone",
        "sector",
        "community_name",
        "ward_name",
        "location",
      ]});
      this.beneficiariesData = reportData.splice(1)
    };
  }

  setLGAS(){
    this.selectedState = this.states.find(e => e.id == this.state_id)
  }

  submitBeneficiaries(){
    this.beneficiariesData.forEach(e => {
      e.state_id = this.state_id
      e.lga_id = this.lga_id
      e.sub_component_id = this.sub_component_id
      e.critical_life_skills_training_recieved = (e.critical_life_skills_training_recieved == 'yes') ? '1' : '0';
      e.scholarship_recieved = (e.scholarship_recieved == 'yes') ? '1' : '0';
      e.digital_literacy_skills_training_recieved = (e.digital_literacy_skills_training_recieved == 'yes') ? '1' : '0';
    });
    this.spinner.show()
    this.crud.postAuthData('beneficiaries', {records: this.beneficiariesData}).subscribe(
      (res) => {
        this.spinner.hide()
        document.getElementById('closeBeneficiariesUploadModal').click();
        this.toastr.success('Benefiaries record submitted successfully');
        this.getBeneficiaries()
      },

      (err) => {
        this.spinner.hide()
        this.toastr.error(err.payload || 'An error occured try again');
      }
    )
  }
  openModal(item){
    
  }
  submitTotalNumberOfStudents(){
    this.crud.postCCAuthDatad('savetotalstudents', this.total_students,this.primary_six,this.secondary_schools,this.number_of_grieviances, sessionStorage.getItem('user')).subscribe(
      (res: any) => {
        this.toastr.success(res.payload)
        
      },
      (error) => {
        this.toastr.error(error.message)
      }
    )
  }
  getStudentInStates(){
    this.crud.postCCAuthData('gettotalstudents', this.total_students, sessionStorage.getItem('user')).subscribe(
      (res: any) => {
        //this.toastr.success()
        this.has_added_students  = res.has_added_students;
        this.record = res.record;
        this.total_students =  res.record.number_of_students;
        this.primary_six =  res.record.total_number_of_girls_finishing_primary_six;
        this.secondary_schools =  res.record.total_number_of_secondary_school_students;
        this.number_of_grieviances =  res.record.number_of_grieviances;
      },
      (error) => {
        this.toastr.error(error.message)
      }
    )
  }
}

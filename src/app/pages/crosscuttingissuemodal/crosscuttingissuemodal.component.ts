import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'crosscuttingissuemodal',
  templateUrl: './crosscuttingissuemodal.component.html',
  styleUrls: ['./crosscuttingissuemodal.component.scss']
})
export class CrosscuttingissuemodalComponent implements OnInit {

  @Input() src;
  form: FormGroup;
  states: any;
  lgas: any;
  users: any;
  summaries: any = [];
  contractModalTitle: string = ' Cross Cutting Issue';
  cost_cutting_issues:any;
  subs:any;
  years:any;
  quarters:any;
  constructor( public modalService: NgbModal, public activeModal: NgbActiveModal, private crud: CrudService , public fb: FormBuilder , private toastr: ToastrService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
   
    if (this.src) {
      
      this.contractModalTitle = 'Edit Cross Cutting Issue';
      //this.summaries= this.src?.plan_summary;
    }
    this.initForm();
    this.getUsers();
    this.getStates();
    this.getCrossCuttingIssues();
    this.getSubComponent();
    this.getQuarters();
    this.getYears();
  }
  getQuarters() {
    this.spinner.show();
    this.crud.getCCAuthData('quarters').subscribe(
      (res: any) => {
        this.quarters = res.payload
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
      );
  }

  getYears() {
    this.spinner.show();
    this.crud.getCCAuthData('years').subscribe(
      (res: any) => {
        this.years = res.payload
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
      );
  }
  initForm(){
     
    this.form = this.fb.group({
      state_id: [this.src?.state_id || '', Validators.required],
      year:  [this.src?.year || '', Validators.required],
      quarter:  [this.src?.quarter || '', Validators.required],
      cross_cutting_issue_id:  [this.src?.cross_cutting_issue_id || '', Validators.required],
      sub_component_id: [this.src?.sub_component_id || '', Validators.required],
      reported:  [this.src?.reported || '', Validators.required],
      investigated:  [this.src?.investigated || '', Validators.required],
      uninvestigated: [this.src?.univestigated || '', Validators.required],
      resolved: [this.src?.resolved || '', Validators.required],
      unresolved: [this.src?.unresolved || '', Validators.required]
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    // if (this.form.value.plan_summary) {
    //   this.addSummary();
    // }

    // if (this.summaries.length < 1) {
    //   this.toastr.info('You have not enter any summary');
    //   return
    // }
    // if (this.form.invalid) { 
    //   this.toastr.info('Some fields are missing')
    //  return
    // }
    if (this.src) {
      this.crud.putCCAuthData('cissuesupdate', this.form.value, this.src.id).subscribe(
        (res: any) => {
          this.toastr.success(res.payload)
          this.activeModal.close();
          this.src = undefined;
        },
        (err)=>{
          this.toastr.error(err.message)
        });
    }else{

      this.crud.postCCAuthData('cissues', this.form.value, sessionStorage.getItem('user')).subscribe(
        (res: any) => {
          this.toastr.success(res.payload)
          this.activeModal.close();
        },
        (error)=>{
          this.toastr.error(error.message)
        }
      )

    }
    
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
  getCrossCuttingIssues(){
    this.crud.getAuthData('cross-cutting-issues').subscribe(
      (res: any)=>{
        this.cost_cutting_issues = res?.payload
      },
      (err: any)=>{

      }
    )
  }
  getSubComponent(){
    this.crud.getAuthData('sub-components').subscribe(
      (res: any)=>{
        this.subs = res?.payload
      },
      (err: any)=>{

      }
    )
  }
  setLocals(){
    this.lgas = this.states.filter(e => e.id == this.form.value.state)[0].lgas;
  }

  getUsers(){
    console.log('test')
    this.users = this.crud.getAuthData('roles/4/users').subscribe(
      (res: any)=>{
        this.users = res?.payload
      }
    )
  }

  addSummary(){
    if (this.form.value.plan_summary) {
      this.summaries.push(this.form.value.plan_summary)
      this.form.patchValue({
        plan_summary: ''
      })
    }
  }

  deleteSummary(i){
    this.summaries.splice(i, 1)
  }
}

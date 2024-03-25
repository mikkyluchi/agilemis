import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'pcmodal',
  templateUrl: './pcmodal.component.html',
  styleUrls: ['./pcmodal.component.scss']
})
export class PcmodalComponent implements OnInit {

  @Input() src;
  @Input() intermediate_outcome_indicator_component_id;
  form: FormGroup;
  states: any;
  lgas: any;
  users: any;
  summaries: any = [];
  contractModalTitle: string = 'Project Category';
  cost_cutting_issues:any;
  subs:any;
  intermediateoutcomeindicators:any;
  pdos:any;
  subpdos:any;
  constructor( public modalService: NgbModal, public activeModal: NgbActiveModal, private crud: CrudService , public fb: FormBuilder , private toastr: ToastrService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
   
    if (this.src) {
      
      this.contractModalTitle = 'Edit Project Category';
      //this.summaries= this.src?.plan_summary;
    }
    this.initForm();
    this.getUsers();
    this.getStates();
    this.getCrossCuttingIssues();
    this.getSubComponent();
    this.getPDOComponent();
    this.getSubPDOComponent();
    this.iois()
  }

  initForm(){
     
    this.form = this.fb.group({
      title: [this.src?.title || '', Validators.required],
      sub_component_id: [this.src?.sub_component_id || '', Validators.required],
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
      this.crud.postCCCAuthDataUpdate('projectcategoryupdate', this.form.value, this.src.id).subscribe(
        (res: any) => {
          this.toastr.success(res.payload)
          this.activeModal.close();
          this.src = undefined;
        },
        (err)=>{
          this.toastr.error(err.message)
        });
    }else{

      this.crud.postCCCAuthData('outputindicator', this.form.value).subscribe(
        (res: any) => {
          this.toastr.success(res.payload)
          this.activeModal.close();
        },
        (error)=>{
          this.toastr.error(error.message)
        }
      )

    }
    this.crud.refreshdata.emit();
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
  getPDOComponent(){
    this.crud.getCCAuthData('pdoindicator').subscribe(
      (res: any)=>{
        this.pdos = res?.payload
      },
      (err: any)=>{

      }
    )
  }
  getSubPDOComponent(){
    this.crud.getCCAuthData('subpdoindicator').subscribe(
      (res: any)=>{
        this.subpdos = res?.payload
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
  iois(){
    this.spinner.show()
    this.crud.getCCAuthData('intermediateoutcomeindicator').subscribe(
      (res: any) => {
        this.intermediateoutcomeindicators = res?.payload
        this.spinner.hide()
      },
      (error) => {
        this.spinner.hide()
        this.toastr.error(error.error.payload)
      }
    )
  }
}

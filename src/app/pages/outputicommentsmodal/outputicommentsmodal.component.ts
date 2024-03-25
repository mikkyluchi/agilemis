import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'outputicommentsmodal',
  templateUrl: './outputicommentsmodal.component.html',
  styleUrls: ['./outputicommentsmodal.component.scss']
})
export class OutputicommentsmodalComponent implements OnInit {
  comments:any
  @Input() src;
  @Input() intermediate_outcome_indicator_component_id;
  form: FormGroup;
  states: any;
  lgas: any;
  users: any;
  summaries: any = [];
  contractModalTitle: string = 'Output Indicators Result';
  cost_cutting_issues:any;
  subs:any;
  intermediateoutcomeindicators:any;
  quarters:any;
  years:any;
  user:any;
  currentUserObj:any;
  constructor( public modalService: NgbModal, public activeModal: NgbActiveModal, private crud: CrudService , public fb: FormBuilder , private toastr: ToastrService, private spinner: NgxSpinnerService ) { 
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.currentUserObj = JSON.parse(sessionStorage.getItem("user"));
  }
  getLGAs(){
    this.spinner.show();
    this.crud.getCCAuthData('outcomes/getlgas?user='+this.user.id).subscribe(
      (res: any) => {
        this.lgas = res.payload
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
      );
    
  }
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
    this.iois()
    this.getQuarters();
    this.getYears();
    this.getComments();
  }
  getComments(){
    this.spinner.show();
    this.crud.getCCAuthData('comments?id='+this.src.id).subscribe(
      (res: any) => {
        this.comments = res.payload
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
      );
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
      comments: ['', Validators.required],
      user:[this.user.id]

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
    this.crud.putCCAuthData('comments', this.form.value, this.src.id).subscribe(
      (res: any) => {
        this.toastr.success(res.payload)
        this.activeModal.close();
        this.src = undefined;
      },
      (err)=>{
        this.toastr.error(err.message)
      });
    
  }

  // getStates(){
  //   this.crud.getAuthData('states?lgas').subscribe(
  //     (res:any) => {
  //       this.states = res?.payload
  //     },
  //     (error: any) => {
  //     }
  //   )
  // }
  getStates() {
    this.crud.getAuthData('states').subscribe((res: any) => {
      this.states = res.payload;
    //  this.getAllStats()
    })
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
  getOIsbySubs(){
    this.spinner.show();
    this.crud.getCCAuthData('outputindicatorbysub?sub_component_id='+this.form.controls['sub_component_id'].value).subscribe((res: any) => {
      this.intermediateoutcomeindicators = res.payload
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      });

  }
  setLocals(){
    //this.lgas = this.states.filter(e => e.id == this.form.value.state)[0].lgas;
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
    this.crud.getCCAuthData('outputindicator').subscribe(
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


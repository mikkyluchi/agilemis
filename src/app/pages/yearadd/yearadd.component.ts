import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';


@Component({
  selector: 'yearadd',
  templateUrl: './yearadd.component.html',
  styleUrls: ['./yearadd.component.scss']
})
export class YearaddComponent implements OnInit {

  @Input() src;
  form: FormGroup;
  states: any;
  lgas: any;
  users: any;
  summaries: any = [];
  contractModalTitle: string = ' Year';
  cost_cutting_issues:any;
  subs:any;
  constructor( public modalService: NgbModal, public activeModal: NgbActiveModal, private crud: CrudService , public fb: FormBuilder , private toastr: ToastrService, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
   
    if (this.src) {
      
      this.contractModalTitle = 'Edit Year';
      //this.summaries= this.src?.plan_summary;
    }
    this.initForm();
    this.getUsers();
    this.getStates();
    this.getCrossCuttingIssues();
    this.getSubComponent();
  }

  initForm(){
     
    this.form = this.fb.group({
      title: [this.src?.title || '', Validators.required]
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
      this.crud.putCCAuthData('years', this.form.value, this.src.id).subscribe(
        (res: any) => {
          this.toastr.success(res.payload)
          this.activeModal.close();
          this.src = undefined;
        },
        (err)=>{
          this.toastr.error(err.message)
        });
    }else{

      this.crud.postCCCAuthData('years', this.form.value).subscribe(
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

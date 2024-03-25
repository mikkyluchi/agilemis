import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'plan-modal',
  templateUrl: './plan-modal.component.html',
  styleUrls: ['./plan-modal.component.scss']
})
export class PlanModalComponent implements OnInit {
  config = {
    displayFn:(item: any) => { return item.name; },
    displayKey:"name", //if objects array passed which key to be displayed defaults to description
    search:true ,//true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
    selectAllLabel: 'Select all', // label that is displayed in multiple selection for select all
    enableSelectAll: false // enable select all option to select all available items, default is false
  }
  @Input() src;
  
  form: FormGroup;
  states: any;
  lgas: any;
  users: any;
  summaries: any = [];
  contractModalTitle: string = 'Add Plan';
  user:any;
  currentUserObj:any;
  constructor( public modalService: NgbModal, public activeModal: NgbActiveModal, private crud: CrudService , public fb: FormBuilder , private toastr: ToastrService, private spinner: NgxSpinnerService ) {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.currentUserObj = JSON.parse(sessionStorage.getItem("user"));
   }

  ngOnInit(): void {

    if (this.src) {
      this.contractModalTitle = 'Edit Plan';
      this.summaries= this.src?.plan_summary;
    }
    this.initForm();
    this.getUsers();
    this.getStates();
  }

  initForm(){
    this.form = this.fb.group({
      sbmc_id: [this.src?.sbmc_id || '', Validators.required],
      lga_id: [this.src?.lga_id || '', Validators.required],
      objective: [this.src?.objective || '', Validators.required],
      priority_areas: [this.src?.priority_areas || '', Validators.required],
      community: [this.src?.community || '', Validators.required],
      school: [this.src?.school || '', Validators.required],
      year: [this.src?.year || '', Validators.required],
      male_entrollment: [this.src?.male_entrollment || '', Validators.required],
      female_entrollment: [this.src?.female_entrollment || '', Validators.required],
      latitude: [this.src?.latitude || '', Validators.required],
      longitude: [this.src?.longitude || '', Validators.required],
      plan_summary: '',
      emis_school_code: [this.src?.emis_school_code || '', Validators.required],
      amount_of_grant: [this.src?.amount_of_grant || '', Validators.required],
      state: '',
      currency_type: [this.src?.currency_type || '', Validators.required],
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    if (this.form.value.plan_summary) {
      this.addSummary();
    }

    if (this.summaries.length < 1) {
      this.toastr.info('You have not enter any summary');
      return
    }
    if (this.form.invalid) {
      console.log(this.form.value)
     this.toastr.info('Some fields are missing')
     return
    }
    delete this.form.value.state;
    this.form.patchValue({
      plan_summary: this.summaries
    })

    if (this.src) {
      this.crud.patchAuthData(`plans/${this.src.id}`, this.form.value).subscribe(
        (res: any) => {
          this.toastr.success(res.payload)
          this.activeModal.close();
          this.src = undefined;
        },
        (err)=>{
          this.toastr.error(err.message)
        });
    } else {
      this.crud.postAuthData('plans', this.form.value).subscribe(
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

  setLocals(){
    this.lgas = this.states.filter(e => e.id == this.form.value.state)[0].lgas;
  }

  getUsers(){
    console.log('test')
    this.users = this.crud.getCCAuthData('sbmcusers?id='+this.user.id).subscribe(
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
  selectionChanged(event){

  }
}

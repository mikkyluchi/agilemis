import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  contractForm: FormGroup;
  contractModalTitle = 'Add Activity';
  @Input() sub_component_id:any;
  @Input() src;
  output: any;
  states: any;
  outputs: any;
  tempLocals: any;
  plans: any;
  categories: any;
  permanentCategories: any;
  subs: any;
  components: any;
  submitted = false;
  plan: any;
  constructor( public modalService: NgbModal, public activeModal: NgbActiveModal, private crud: CrudService , public fb: FormBuilder , private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    if (this.src) {
      this.contractModalTitle = 'Edit Activity';
    }

    this.initForm();
    this.getStates();
    this.getOutputs();
    this.getPlans();
    this.getSubComponent();
    this.getCategories();
    this.getComponent();
  }

  initForm(){
    this.contractForm = this.fb.group({
      outputs: [this.src?.outputs || '', Validators.required],
      sub_component_id: [this.sub_component_id || '', Validators.required],
      project_component_id: ['', Validators.required],
      plan_id: [this.src?.plan_id || '', Validators.required],
      category_id: [this.src?.category_id || '', Validators.required],
      title: [this.src?.title || '', Validators.required],
      description: [this.src?.description || '', Validators.required],
      currency_type: [this.src?.currency_type || '', Validators.required],
      cost: [this.src?.cost || '', Validators.required],
      status: [this.src?.status || '', Validators.required],
      loc: [this.src?.loc || '', Validators.required],
      state: [this.src?.lga?.state_id || '', Validators.required],
      lga_id: [this.src?.lga_id || '', Validators.required],
      location: [this.src?.location || ''],
      no_of_creative_content_used: [this.src?.no_of_creative_content_used || ''],
      latitude: [this.src?.latitude || ''],
      longitude: [this.src?.longitude || ''],
      funding_source: [this.src?.funding_source || ''],
      start_date: [this.src?.start_date || '', Validators.required],
      end_date: [this.src?.end_date || '', Validators.required]
    });
    
  }

  // checkStartDate(){
  //   let date1 = new Date(this.plan.start_date).getTime();
  //   let date2 = new Date(d2).getTime();

  //   if (date1 < date2) {
  //     console.log(`${d1} is less than ${d2}`);
  //   } else if (date1 > date2) {
  //     console.log(`${d1} is greater than ${d2}`);
  //   } else {
  //     console.log(`Both dates are equal`);
  //   }
  // }

  getOutputs(){
    this.getOutputIndicators()
    // this.spinner.show();
    // this.crud.getAuthData('outputs').subscribe((res: any) => {
    //   this.outputs = res.payload
    //   this.spinner.hide();
    // },
    // error => {
    //   this.spinner.hide();
    // });
  }
  getOutputIndicators() {
    
    this.spinner.show();
    this.crud.getCCAuthData('outputindicatorbysub?sub_component_id='+this.sub_component_id).subscribe((res: any) => {
      this.outputs = res.payload
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      });

  }
  getStates(){
    this.crud.getAuthData('states?lgas').subscribe(
      (res:any) => {
        this.states = res?.payload

        if (this.src) {
          this.tempLocals = this.states.filter(e => e.id == this.src?.lga?.state_id)[0].lgas
        }
      },
      (error: any) => {
      }
    )
  }

  createProject(contractForm: FormGroup) {
    const userData = JSON.parse(sessionStorage.getItem('user')) ;
    const projectData = contractForm.value;
    delete projectData.state
    if (this.src) {
      projectData.id = this.src.id ;
      this.submitted = true
      this.crud.ccpatchAuthData("project/update", projectData).subscribe(
        (res: any) => {
          this.submitted = false
          this.activeModal.close();
          this.toastr.success('Activity Updated successfully')
          location.reload();
          this.src = undefined;
        },
        (err)=>{
          this.submitted = false
        });
    } else {
      this.crud.postAuthData('projects', projectData).subscribe(
        (res: any) => {
          this.submitted = false
          this.toastr.success('Activity created successfully')
          this.activeModal.close();
        },
        (error)=> {
          this.submitted = false
          this.toastr.error(error.message)
        }
      );
    }
  }

    // get project plans
    getPlans(){
      this.crud.getAuthData('plans').subscribe(
        (res: any)=>{
          this.plans = res?.payload
        },
        (err: any)=>{
        }
      )
    }

    // get project categories
    getCategories(){
      this.crud.getAuthData('categories').subscribe(
        (res: any)=>{
          this.categories = res?.payload
          this.permanentCategories = res?.payload
          this.filterCategories();
        },
        (err: any)=>{

        }
      )
    }

    // get project sub-component
    getSubComponent(){
      this.crud.getAuthData('sub-components').subscribe(
        (res: any)=>{
          this.subs = res?.payload
        },
        (err: any)=>{

        }
      )
    }

    // get project sub-component
    getComponent(){
      this.crud.getAuthData('components').subscribe(
        (res: any)=>{
          this.components = res?.payload
        },
        (err: any)=>{

        }
      )
    }

  setLatLng(){
    this.plan = this.plans.filter(e=> e.id == this.contractForm.value.plan_id)[0]
    this.contractForm.patchValue({
      state: this.plan?.lga?.state_id,
      lga_id: this.plan?.lga_id,
      latitude: this.plan?.latitude,
      longitude: this.plan?.longitude,
    });
  }

  setLocals(){
    this.tempLocals = this.states.filter(e => e.id == this.contractForm.value.state)[0].lgas;
  }

  filterCategories(){
    this.categories = this.permanentCategories.filter(e => e.sub_component_id == this.contractForm.value.sub_component_id)
  }
}

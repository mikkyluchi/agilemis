import { Component, OnInit } from '@angular/core';
import { CreateOutcomesComponent } from './modals/outcomes/create-outcomes/create-outcomes.component';
import { EditOutcomesComponent } from './modals/outcomes/edit-outcomes/edit-outcomes.component';
import { CreateOutputsComponent } from './modals/outputs/create-outputs/create-outputs.component';
import { EditOutputsComponent } from './modals/outputs/edit-outputs/edit-outputs.component';
import { KraOutputsComponent } from './modals/outputs/kra-outputs/kra-outputs.component';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AddPriorityMdaComponent } from './modals/prorities/add-priority-mda/add-priority-mda.component';
import { CreateMandateComponent } from './modals/mandates/create-mandate/create-mandate.component';
import { EditMandateComponent } from './modals/mandates/edit-mandate/edit-mandate.component';
import { SetupComponent } from './modals/setup/setup.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CreateLeadingComponent } from './modals/leading/create-leading/create-leading.component';
import { EditLeadingComponent } from './modals/leading/edit-leading/edit-leading.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateSubOutputComponent } from './modals/sub-outputs/create-sub-output/create-sub-output.component';
import { EditSubOutputComponent } from './modals/sub-outputs/edit-sub-output/edit-sub-output.component';
import { CreatePdoIndicatorComponent } from './modals/pdo-indicator/create-pdo-indicator/create-pdo-indicator.component';
import { EditPdoIndicatorComponent } from './modals/pdo-indicator/edit-pdo-indicator/edit-pdo-indicator.component';
import { AddSubPdoIndicatorComponent } from './modals/sub-pdo-indicator/add-sub-pdo-indicator/add-sub-pdo-indicator.component';
import { EditSubPdoIndicatorComponent } from './modals/sub-pdo-indicator/edit-sub-pdo-indicator/edit-sub-pdo-indicator.component';
declare var $: any;
@Component({
  selector: 'app-result-tree',
  templateUrl: './result-tree.component.html',
  styleUrls: ['./result-tree.component.scss']
})
export class ResultTreeComponent implements OnInit {
  modalRef: any;
  bsModalRef: BsModalRef;
  welcome: boolean = true;
  sp: any;
  current: any;
  active: any;
  id: any = 0;
  currentPriorities: any
  priorities: any
  zoom = 1;
  activeObject = false;
  currentView: any = 'so';
  mandates: any[];
  ministries: any;
  temp: any;
  allPriorities: any;
  priorityIndex = 0;
  currentViewText: any = 'Strategic View';
  activeYear: string;
  structureView: any = 'vertical'
  projectComponents: any;
  states: any;
  user: any;
  treeType: any = 'Component';
  outcomeDrillDown: any = 'output';
  pdoTree: any;
  pdoIndicators: any;
  subPdoIndicators: any;
  subOutcomes: any;
  constructor(private modalService: BsModalService, private router: Router, private toastr: ToastrService, private crud: CrudService, private spinner: NgxSpinnerService) {
    this.priorities = JSON.parse(localStorage.getItem('priorities'));
    this.activeYear = localStorage.getItem('activeYear')
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  ngOnInit() {
    this.getComponents();
    this.getPDOIndicators();
    this.getSubPDOIndicators();
    this.getSubOutcomeIndicators();
    this.getStates();
    if (this.welcome = false)
    this.openModal();
    this.getMda();
  }

  getSubOutcomeIndicators(){
    this.crud.getAuthData('sub-outcomes').subscribe(
      (res:any) => {
        this.subOutcomes = res?.payload
      },
      (error: any) => {
      }
    )
  }

  getSubPDOIndicators(){
    this.crud.getAuthData('sub-pdo-indicators').subscribe(
      (res:any) => {
        this.subPdoIndicators = res?.payload
      },
      (error: any) => {
      }
    )
  }

  getPDOIndicators(){
    this.crud.getAuthData('pdo-indicators').subscribe(
      (res:any) => {
        this.pdoIndicators = res?.payload
      },
      (error: any) => {
      }
    )
  }


  pullTree(){
    if (this.treeType == 'Outcome') {
      this.getComponents();
    }else{
      this.getPDOTree()
    }
  }
  getStates(){
    this.crud.getAuthData('states').subscribe(
      (res:any) => {
        this.states = res?.payload
        console.log(this.states)
      },
      (error: any) => {
      }
    )
  }

  getComponents(){
    this.spinner.show()
    this.crud.getAuthData('result-trees').subscribe(
      (res: any) => {
        this.projectComponents = res.payload;
        this.spinner.hide()

        setTimeout(() => {
          const toggler = document.getElementsByClassName("carret");

          for (let i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function() {
              this.parentElement.querySelector(".nested").classList.toggle("active");
              this.classList.toggle("carret-down");
            });
          }
        }, 2000);
      },
      error =>{}
    )
  }

  getPDOTree(){
    this.spinner.show()
    this.crud.getAuthData('pdo-indicators-tree').subscribe(
      (res: any) => {
        this.pdoTree = res.payload;
        console.log(this.pdoTree);
        setTimeout(() => {
          const toggler = document.getElementsByClassName("carret");

          for (let i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function() {
              this.parentElement.querySelector(".nested").classList.toggle("active");
              this.classList.toggle("carret-down");
            });
          }
        }, 2000);
        this.spinner.hide()
      },
      error =>{}
    )
  }

  openModal() {
    const initialState = {
      data: this.priorities
    }
    this.bsModalRef = this.modalService.show(SetupComponent, { class: 'modal-lg', initialState });
    this.bsModalRef.content.closeBtnName = 'Got it';
  }

  createPDOIndicator(){
    const initialState = {}
    const modalRef = this.modalService.show(CreatePdoIndicatorComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getPDOTree();
    })
  }

  createSubPDOIndicator(data){
    const initialState = {data}
    const modalRef = this.modalService.show(AddSubPdoIndicatorComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getPDOTree();
    })
  }

  editPDOIndicator(data){
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(EditPdoIndicatorComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getPDOTree();
    })
  }

  editSubPDOIndicator(data){
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(EditSubPdoIndicatorComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getPDOTree();
    })
  }

  createMandates(data) {
    const initialState = {
      data: { outputId: data.id },
    }
    const modalRef = this.modalService.show(CreateMandateComponent, { class: '', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  editComponent(data) {
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(EditMandateComponent, { class: '', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  editOutcome(data) {
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(EditOutcomesComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  editSubOutput(data) {
    let distributions;
    this.crud.getAuthData(`sub-outputs/${data.id}/distributions`).subscribe(
      (e: any) => {
        distributions = e?.payload
        const initialState = {
          data,
          distributions,
          states: this.states,
          sub_outcomes: this.subOutcomes,
          sub_pdos: this.subPdoIndicators
        }
        const modalRef = this.modalService.show(EditSubOutputComponent, { class: 'modal-lg', initialState });
        modalRef.content.onClose.subscribe(result => {
          this.getComponents();
        })
      }
    )
  }

  editOutput(data) {
    let distributions;
    this.crud.getAuthData(`outputs/${data.id}/distributions`).subscribe(
      (e: any) => {
        distributions = e?.payload
        const initialState = {
          data,
          distributions,
          states: this.states,
          pdos: this.pdoIndicators
        }
        const modalRef = this.modalService.show(EditOutputsComponent, { class: 'modal-lg', initialState });
        modalRef.content.onClose.subscribe(result => {
          this.getComponents();
        })
      }
    )
  }

  editMajorOutcome(data) {
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(EditLeadingComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  createOutcomeIndicator(data) {
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(CreateOutcomesComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  createMajorOutcomeIndicator(data) {
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(CreateLeadingComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  createOutputIndicator(data) {
    const initialState = {
      data,
      states: this.states,
      pdos: this.pdoIndicators
    }
    const modalRef = this.modalService.show(CreateOutputsComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  createSubOutputIndicator(data) {
    const initialState = {
      data,
      states: this.states,
      sub_outcomes: this.subOutcomes,
      sub_pdos: this.subPdoIndicators
    }
    const modalRef = this.modalService.show(CreateSubOutputComponent, { class: 'modal-lg', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  selectMinistry(data) {
    const initialState = {
      data: data
    }
    const modalRef = this.modalService.show(AddPriorityMdaComponent, { class: '', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  editKra(data, type) {
    const initialState = {
      data: data,
      type: type
    }
    const modalRef = this.modalService.show(KraOutputsComponent, { class: '', initialState });
    let id = this.id
  }
  deleteOutcome(id) {
  }

  deleteIndicator(id, endpoint, label){
    this.spinner.show();
    this.crud.deleteAuthData(`${endpoint}/${id}`).subscribe(
      res => {
        this.toastr.success(`${label} has been deleted`)
        this.spinner.hide();
        this.getComponents();
      },
      error => {
        this.toastr.error(`Failed to delete ${label}`)
      }
    )
  }

  deleteOutputs(id) {
  }
  createProject(data) {
    const initialState = {
      data: data
    }
  }
  move(data, ind) {
  }

  finish() {
    this.router.navigate(['/dashboard'])
  }

  getMda() {
  }

  getIndicatorValue(ind) {
    let value = 0;
    //console.log(ind);

    ind.projects.forEach(element => {
      value += parseInt(element.drs[element.drs.length - 1].output);
      if (ind.projects[ind.projects.length - 1] == element) {
      }
    });
    return value;
  }

  getPriorities() {
  }

  calcPercentage(a, b, t, agg) {
    if (t == null) return null;
    let tar = t;
    // let tar = this.prepareTarget(t, null).target;
    let r
    if (r <= 33.3) {
      return 1;
    }
    if (r > 33.3 && r <= 66.6) {
      return 2;
    }
    return 3;
  }

  zoomIn() {
    this.zoom += 0.1;
    $('.tree').css('zoom', this.zoom);
  }

  zoomOut() {
    this.zoom -= 0.1;
    $('.tree').css('zoom', this.zoom);
  }

  changeView(id, text) {
    this.currentViewText = text
    this.currentView = id;
    // this.filterData(id);
    if (this.currentView == 'so') {

      this.priorities = this.temp
      return
    }
    this.priorities = this.temp.filter((data) => {
      let mdas = JSON.parse(data.mdas)
      //console.log(mdas);
      if (mdas.length == 0) return false
      if (JSON.parse(data.mdas).includes(this.currentView)) {
        return true;
      }
      return false
    })
  }
}

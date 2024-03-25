import { Component, OnInit } from '@angular/core';
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import * as XLSX from "xlsx";
import { ActivityService } from "../../services/activity.service";
import { ModalComponent } from "../modal/modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import * as Excel from "exceljs";
import * as fs from 'file-saver';
import { LogframesService } from "../../services/logframes/logframes.service";
import { WorkSheet } from "xlsx";
import { CrudService } from "src/app/shared/services/crud.service";
import { PlanModalComponent } from "../plan-modal/plan-modal.component";
import { CrosscuttingissuemodalComponent } from "../crosscuttingissuemodal/crosscuttingissuemodal.component";
import { ProjectUploadModalComponent } from "../modal/project-upload-modal/project-upload-modal.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IoimodalComponent } from '../ioimodal/ioimodal.component';
import { IoiitemmodalComponent } from '../ioiitemmodal/ioiitemmodal.component';
import { OutputimodalComponent } from '../outputimodal/outputimodal.component';
import { OutputiresultmodalComponent } from '../outputiresultmodal/outputiresultmodal.component';

import { NgModel } from '@angular/forms';
import { first } from 'rxjs';
import { PcmodalComponent } from '../pcmodal/pcmodal.component';
declare var $: any;
@Component({
  selector: 'projectcategories',
  templateUrl: './projectcategories.component.html',
  styleUrls: ['./projectcategories.component.scss']
})
export class ProjectcategoriesComponent implements OnInit {

  currentUserObj: any;
  form: FormGroup;
  subs: any;
  output_id = '';
  mdasList: any;
  file: any;
  fileName: any;
  arrayBuffer: any;
  projectData: any[];

  selectedMdas: any;
  mdas: any;
  isValidTypeBoolean = false;
  isValid = false;
  getProjectData: any[];
  page: any;
  projectQuery: any;
  allMandateData: any;
  siData: any;
  selectedMandate: any;
  selectedSi: any;
  projectId: any;
  placeholderValue = "Filter by Mdas";
  collection: any;
  batchId: any;

  itemsPerPage = 10;
  totalItems: any = 5006;

  getProjectDataMDA: any;
  years: any[] = [2022, 2021, 2020, 2019];
  selFiles: FileList;


  reports;
  selectedReport;
  formParams: FormData;

  selectedMda: any;
  allBudgetdata: any;
  activeYear: any;
  reportsList: any;
  projectsToDownload: any;
  mda_id: any;
  logframes: any;
  quarter: any;
  priority_id: any;
  outputs: void;
  components: any;
  component_id: any;
  projects: any;
  crosscuttingissues: any;
  selectedStateLgas
  states: any;
  user: any;
  selectedPlan: any;
  plans: any;
  categories: any;
  category_id: any;
  filterValue: any;
  projectMetaData: any;
  stats: any;
  lgas: any;
  sub_components: any;
  permanentCategories: any;
  sub_component_id: any;
  currentSubcomponent: any;
  intermediateoutcomeindicatorgroups: any;
  intermediateoutcomeindicatorgroupsresult: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private activity_service: ActivityService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private logService: LogframesService, //service for logframe,
    private crud: CrudService,
    private bsModalService: BsModalService,
  ) {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.sub_component_id = this.route.snapshot.paramMap.get('id')
    this.currentUserObj = JSON.parse(sessionStorage.getItem("user"));
    this.crud.refreshdata.subscribe(res => {
      this.getOutputIndicators();
    })
  }

  ngOnInit() {
    // this.initForm();
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.getProjects()
    // this.getProjectStats();
    // this.getComponents();
    // this.getComponent();
    // this.getOutputs();
    // this.getStates();
    // this.getPlans();
    // this.getCategories()
    // this.getOutputIndicators()
    // this.getOutputIndicatorsResults()
    this.getCategories();
    this.getSubComponent()
  }
  getSubComponent() {
    this.crud.getAuthData('sub-components').pipe(first()).subscribe(
      (res: any) => {
        this.subs = res?.payload;




      }
    )
  }
  getOutputIndicators() {
    this.spinner.show();
    this.crud.getCCAuthData('outputindicator').subscribe((res: any) => {
      this.intermediateoutcomeindicatorgroups = res.payload
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      });
  }
  getOutputIndicatorsResults() {
    this.spinner.show();
    this.crud.getCCAuthData('outputindicatorresults?user=' + this.user.id).subscribe((res: any) => {
      this.intermediateoutcomeindicatorgroupsresult = res.payload
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      });
  }
  initForm() {
    this.form = this.fb.group({
      year: '',
      quarter: '',
      sub_component_id: ''
    })
  }
  submit() {
    if (this.form.invalid) {
      console.log(this.form.value)
      this.toastr.info('Some fields are missing')
      return
    }
    this.crud.postCCAuthData('cissueslist', this.form.value, sessionStorage.getItem('user')).subscribe(
      (res: any) => {
        this.toastr.success(res.payload)
        this.crosscuttingissues = res.data;
      },
      (error) => {
        this.toastr.error(error.message)
      }
    )
  }
  paginate(e) {
    this.crud.getAuthData(`projects?page=${e.page + 1}`).subscribe(
      (res: any) => {
        this.projects = res?.payload?.data;
        this.projectMetaData = res?.payload
      }
    )
  }

  getProjects() {
    this.crud.getAuthData(`projects?sub_component_id=${this.sub_component_id}`).subscribe(
      (res: any) => {
        this.projects = res?.payload;
        this.projectMetaData = res?.payload
      }
    )
  }

  getStates() {
    this.crud.getAuthData('states?lgas').subscribe(
      (res: any) => {
        this.states = res?.payload
      },
      (error: any) => {
      }
    )
  }

  getProjectStats() {
    this.crud.getAuthData(`analytics/projects?sub_component_id=${this.sub_component_id}`).subscribe(
      (res: any) => {
        this.stats = res?.payload;
      }
    )
  }

  onfilechange(event: any) {
    this.isValid = true;
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, { type: "binary" });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet: WorkSheet = workbook.Sheets[first_sheet_name];
      console.log(worksheet);
      this.projectData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      event.target.value = "";
    };
  }

  onfilechangeLogframe(event: any) {
    this.isValid = true;
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, { type: "binary" });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet: WorkSheet = workbook.Sheets[first_sheet_name];
      const projectData = XLSX.utils.sheet_to_json(worksheet, { header: ["puid", "title", "fec_memo_no", "budget_code", "status", "project_type", "state", "lga", "location", "longitude", "latitude", "approval_date", "start_date", "end_date", "objective", "contractor", "funding_source", "currency", "appropriated", "cost", "released", "utilized", "challenges", "recommendations", "actual_level_of_work", "actual_milestone", "planned_milestone", "logframe_status"] });
      this.projectData = projectData.splice(6)
      event.target.value = "";
    };
  }

  setLGAS(data) {
    return this.states.filter(e => e.title == data)[0].lgas;
  }

  projectUpload() {
    const initialState = {
      states: this.states,
      components: this.components,
      outputs: this.outputs,
      categories: this.categories,
      plans: this.plans,
      sub_component_id: this.sub_component_id
    }
    const modalRef = this.bsModalService.show(ProjectUploadModalComponent, { class: 'modal-xl', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getProjects();
    })
  }
  createProject() {
    this.projectData.forEach(e => {
      const lgas = this.states.filter(i => i.title == e.state)[0].lgas;
      e.lga_id = lgas.filter(i => i.title == e.lga)[0].id;
      e.cost = e.cost + '';
      e.loc = e.level_of_completion
      delete e.state;
      delete e.level_of_completion;
      delete e.lga;
    })

    console.log(this.projectData)
    this.crud
      .postAuthData('projects/bulk/uploads', { projects: this.projectData })
      .subscribe((res: any) => {
        this.toastr.success(res.message);
        document.getElementById('closeUploadModal').click();
      });
  }

  downloadFile() {
    const link = document.createElement("a");
    link.download = "filename";
    link.href =
      "https://tse2.mm.bing.net/th?id=OIP.UPrBMEKmzX2CELjBUQETCAHaEc&pid=Api&P=0&w=285&h=171";
    link.click();
  }

  getComponent() {
    this.crud.getAuthData('components').subscribe(
      (res: any) => {
        this.components = res?.payload
      },
      (err: any) => {

      }
    )
  }

  getComponents() {
    this.spinner.show();
    this.crud.getAuthData('sub-components').subscribe((res: any) => {
      this.sub_components = res.payload

      this.currentSubcomponent = this.sub_components.find(e => e.id == this.sub_component_id)
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      });
  }

  getOutputs() {
    this.spinner.show();
    this.crud.getAuthData('outputs').subscribe((res: any) => {
      this.outputs = res.payload
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      });
  }

  getProjectByPage(page: any) {
    this.activity_service.getProjectbyPage(page).subscribe((res: any) => {
      this.getProjectDataMDA = res.data.data;
      this.projectsToDownload = res.data.data;

      this.page = res.data.current_page;
      this.totalItems = res.data.total;
    });
  }

  getSiByMandateId() {
    const id = this.selectedMandate;
    this.activity_service.getSiByMandateId(id).subscribe((res: any) => {
      this.siData = res.data;

      this.toastr.success(res.message);
    });
  }

  deleteProjectById() {

    this.crud.deleteCCAuthData('projectcategorydelete', this.projectId).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.getCategories();
        document.getElementById('closeDelProjectModal').click();
      },
      (err) => {
        this.toastr.error(err.message)
      });
  }
  deleteProjectByIdd() {

    this.crud.deleteCCAuthData('outputindicatorvaluedelete', this.projectId).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        document.getElementById('closeDelProjectModal').click();
      },
      (err) => {
        this.toastr.error(err.message)
      });
  }

  deleteProjectByBatch() {
    this.activity_service
      .deleteProjectByProjectBatch(this.batchId)
      .subscribe((res: any) => {
        document.getElementById('closeDelProjectByBatchModal').click();

        this.toastr.success(res.message);
      });
  }



  openModal(item: any) {
    const modalRef = this.modalService.open(OutputiresultmodalComponent);
    modalRef.componentInstance.src = item;
  }
  openDoPlanModal() {
    const modalRef = this.modalService.open(OutputiresultmodalComponent);
    //modalRef.componentInstance.src = item;
  }
  editIPlanModal(item) {
    const modalRef = this.modalService.open(OutputiresultmodalComponent);
    modalRef.componentInstance.src = item;
  }
  openEditPlanModal(item: any) {
    const modalRef = this.modalService.open(PcmodalComponent);
    modalRef.componentInstance.src = item;
  }

  viewProjectDetail(item: any) {
    this.router.navigate(["/view-project", item.id]);
  }

  setProjectTable() {
    this.projectData.forEach((currentValue, index) => {
      currentValue.isEditable = false;
    });
  }

  editProjectTable(item: any) {
    this.setProjectTable();
    this.projectData.forEach((currentValue, index) => {
      if (item.__rowNum__ === currentValue.__rowNum__) {
        currentValue.isEditable = true;
      }
    });
  }

  updateProjectArray(item: any) {
    const index = this.projectData.indexOf(item);
    this.projectData[index] = item;
    this.setProjectTable();
    console.log(item);
  }

  fileSelectionChanged(event) {
    this.formParams = new FormData();
    for (const file of event.target.files) {
      this.formParams.append("images[]", file);
      this.formParams.append("id", this.projectId);
    }
  }

  async generateExcel() {

    //Excel Title, Header, Data


    //Create workbook and worksheet
    let workbook = new Excel.Workbook();
    // let worksheet2 = workbook.addWorksheet('Summary Level Results Page');
    let worksheet1 = workbook.addWorksheet('Activity Logframe');
    let w1 = await this.generateAL(worksheet1)
    // let w2 = await this.generateSLRP(worksheet2, shortcode)
    worksheet1 = w1
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'OSGF Report Template.xlsx');
    })
  }

  generateAL(worksheet) {

    const header = [
      "puid",
      'title',
      'fec_memo_no',
      'budget_code',
      'project_status',
      'project_type',
      'state',
      'lga',
      'location',
      'longitude',
      'latitude',
      'approval_date',
      'start_date',
      'end_date',
      'objective',
      'contractor',
      'funding_source',
      'currency',
      'appropriated',
      'cost',
      'released',
      'utilized',
      'challenges',
      'recommendations',
      'actual_level_of_work',
      'actual_milestone',
      'planned_milestone',
      'logframe_status',
    ]

    const data = [
    ];
    let projects = this.projectsToDownload;
    // if (this.role == 'Admin') {

    //   projects = this.projects.filter((res) => {
    //     return res.node.mda.shortcode == shortcode

    //   })
    // } else {
    //   projects = this.projects
    // }
    for (let index = 0; index < projects.length; index++) {
      const element = projects[index];

      let da = [
        element?.puid || '',
        element?.title || '',
        element?.fec_memo_no || '',
        element?.budget_code || '',
        element?.status || '',
        element?.project_type || '',
        element?.state || '',
        element?.lga || '',
        element?.location || '',
        element?.longitude || '',
        element?.latitude || '',
        element?.approval_date || '',
        element?.start_date || '',
        element?.end_date || '',
        element?.objective || '',
        element?.contractor || '',
        element?.funding_source || '',
        element?.currency || '',
        element?.appropriated || '',
        element?.cost || '',
        element?.released || '',
        element?.utilized || '',
        element?.challenges || '',
        element?.recommendations || '',
        element?.actual_level_of_work || '',
        element?.actual_milestone || '',
        element?.planned_milestone || '',
        element?.logframe_status || '',
      ]
      data.push(da);
    }

    //    const imageId2 = workbook.addImage({
    //   buffer: fs.readFileSync('path/to.image.png'),
    //   extension: 'png',
    // });

    //     worksheet.addImage(imageId1, 'A1:Q1');

    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A2:V2');
    worksheet.getCell('A2').value = 'OFFICE OF THE SECRETARY TO THE GOVERNMENT OF THE FEDERATION';
    worksheet.getCell('A2').alignment = { horizontal: 'center' };
    worksheet.getCell('A2').font = {
      color: { argb: 'FF008000' },
      size: 15,
      bold: true
    }

    worksheet.mergeCells('A3:V3');
    worksheet.getCell('A3').value = 'PROJECT/PROGRAMME REPORTING TEMPLATE';
    worksheet.getCell('A3').alignment = { horizontal: 'center' };
    worksheet.getCell('A3').font = {
      color: { argb: 'FF008000' },
      size: 15,
      bold: true
    }
    worksheet.mergeCells('A4:Q4');
    worksheet.getCell('A4').value = 'Q1 Period';
    worksheet.getCell('A4').alignment = { horizontal: 'center' };
    worksheet.getCell('A4').font = {
      color: { argb: 'FF008000' },
      size: 15,
      bold: true
    }

    worksheet.mergeCells('A5:B5');
    worksheet.getCell('A5').value = 'Enter MDA Shortcode: ';


    worksheet.mergeCells('A6:O6');
    worksheet.getCell('A6').value = 'PROJECT/ PLANNING INFORMATION';
    worksheet.getCell('A6').alignment = { horizontal: 'center' };
    worksheet.getCell('A6').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFadd8e6' },
      bgColor: { argb: 'FF000000' }
    }
    worksheet.getCell('A6').font = {
      color: { argb: 'FF000000' },
      size: 14,
      bold: true
    }
    worksheet.mergeCells('P6:U6');
    worksheet.getCell('P6').value = 'FINANCIAL INFORMATION ';
    worksheet.getCell('P6').alignment = { horizontal: 'center' };
    worksheet.getCell('P6').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFff8c00' },
      bgColor: { argb: 'FF000000' }
    }
    worksheet.getCell('P6').font = {
      color: { argb: 'FF000000' },
      size: 14,
      bold: true
    }

    worksheet.mergeCells('V6:Z6');
    worksheet.getCell('V6').value = 'IMPLEMENTATION MONITORING';
    worksheet.getCell('V6').alignment = { horizontal: 'center' };
    worksheet.getCell('V6').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFd3d3d3' },
      bgColor: { argb: 'FF000000' }
    }
    worksheet.getCell('V6').font = {
      color: { argb: 'FF000000' },
      size: 14,
      bold: true
    }
    // worksheet.addImage(logo, 'E1:F3');

    //Blank Row
    //Add Header Row
    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 8;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = 25
    });

    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF000000' },
        bgColor: { argb: 'FF000000' }
      }

      cell.alignment = { wrapText: true };
      cell.font = {
        color: { argb: 'FFFFFFFF' },
        size: 13,
        bold: true
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // var dobCol = worksheet.get(4);
    // dobCol.width = 15;
    // worksheet.addRows(data);
    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);

    }
    );
    worksheet.getColumn(16).width = 50;
    worksheet.getColumn(17).width = 50;
    worksheet.addRow([]);

    return worksheet
  }

  async sortByComponent(id) {
    if (id == this.component_id && this.projects) {
      return
    }
    this.component_id = id;
    this.getProjectsByComponent();
  }

  // pull list of logframes for calendar year
  getProjectsByComponent() {
    this.spinner.show()
    this.crud.getAuthData(`components/${this.component_id}/projects`).subscribe(
      (res: any) => {
        this.projects = res?.payload
        // this.itemsPerPage = res.data.per_page;
        // this.page = res.data.current_page;
        // this.totalItems = res.data.total;
        this.spinner.hide()
      },
      (error) => {
        this.spinner.hide()
        this.toastr.error(error.error.payload)
      }
    )
  }

  openProjectModal() {
    const modalRef = this.modalService.open(ModalComponent);
  }

  openPlanModal() {
    //const modalRef = this.modalService.open(PlanModalComponent);
    const modalRef = this.modalService.open(OutputimodalComponent);
  }
  editPlanModal(item) {
    const modalRef = this.modalService.open(OutputimodalComponent);
    //this.output_id = item.intermediate_outcome_indicator_component_id;
    modalRef.componentInstance.src = item;
    //modalRef.componentInstance.intermediate_outcome_indicator_component_group_id = this.output_id;
  }
  openIOIItemModal() {
    //const modalRef = this.modalService.open(PlanModalComponent);
    const modalRef = this.modalService.open(IoiitemmodalComponent);
    modalRef.componentInstance.intermediate_outcome_indicator_component_group_id = this.output_id;
  }
  searchProject(key, e) {
    this.crud.getAuthData(`projects?sub_component_id=${this.sub_component_id}${'&' + key}=${e.value}`).subscribe(
      (res: any) => {
        this.projects = res.payload
      }
    )
  }

  filterLGA(data) {
    this.lgas = this.states.filter(e => e.id == data.value)[0].lgas;
  }

  // get project plans
  getPlans() {
    this.crud.getAuthData('plans').subscribe(
      (res: any) => {
        console.log(res)
        this.plans = res?.payload
      },
      (err: any) => {

      }
    )
  }

  // get project categories
  getCategories() {
    this.spinner.show();
    this.crud.getCCAuthData('projectcategories').subscribe((res: any) => {
      this.categories = res.payload
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      });
    // this.crud.getAuthData('categories').subscribe(
    //   (res: any) => {
    //     console.log(res)
    //     this.categories = res?.payload
    //     this.permanentCategories = res?.payload
    //   },
    //   (err: any) => {

    //   }
    // )
  }

  filterCategories(data) {
    this.categories = this.permanentCategories.filter(e => e.sub_component_id == data.value)
  }
  sortByOutputs(id) {
    if (id == this.output_id && this.projects) {
      return
    }
    this.output_id = id;
    this.getIndicatorsByGroup(id);
  }
  getIndicatorsByGroup(id) {
    this.spinner.show()
    this.crud.postCCCAuthData('intermediateoutcomeindicatorgroup/indicators', JSON.stringify({ id: id })).subscribe(
      (res: any) => {
        this.projects = res?.payload
        this.spinner.hide()
      },
      (error) => {
        this.spinner.hide()
        this.toastr.error(error.error.payload)
      }
    )
  }
  onSubmit(data: NgModel) {
    this.spinner.show()
    this.crud.postAuthData('categories', data.value).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.getCategories();
      },
      (error) => {
        this.spinner.hide()
      }
    )
  }
}

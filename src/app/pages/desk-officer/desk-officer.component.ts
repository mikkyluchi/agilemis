import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../services/settings/settings.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { LogframesService } from "../../services/logframes/logframes.service";
import * as Excel from "exceljs";
import * as fs from 'file-saver';
import * as XLSX from "xlsx";
import { WorkSheet } from "xlsx";
import { CrudService } from "src/app/shared/services/crud.service";
declare var $: any;
// import { data } from "jquery";
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-desk-officer',
    moduleId: module.id,
    templateUrl: 'desk-officer.component.html',
    styleUrls: ["./desk-officer.component.css"],
})

export class DeskOfficerComponent implements OnInit{
  itemsPerPage: any;
  page: any;
  searchUserIcon = true;
  searchRoleIcon = false;
  totalItems: any = 23;
  itemsPerPage1: any;
  page1: any;
  totalItems1: any;
  query: any;
  currentYear = [2022, 2021, 2020, 2019];
  quarters = [1, 2, 3, 4];
  quarter = 1;
  activeYear;
  title = "Create User";
  roleTitle = "Create New Role";
  PermissionList = [];
  selectedItems = [];
  requestLogForm: FormGroup;
  rejectLogForm: FormGroup;

  alluserdata;
  mdasList;
  mda_id = '';
  logframes: any;
  priorities: any;
  priority_id = '';
  selectedLogframe: any;
  ariaExpanded: any;
  outputs: any;
  projects: any;
  output_id: any;
  user: any;
  indicator: any;
  isValid: boolean;
  file: any;
  fileName: any;
  arrayBuffer: any;
  reportData: unknown[];
  reports: any;
  report: any;
  submissions: any;
  report_id: any;
  sub_submissions: any;
  currentReport = 'output';
  sub_output_id: any;
  sub_outputs: any;
  constructor(
    private settings: SettingsService,
    private logService: LogframesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private crud: CrudService
  ) {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }
  ngOnInit() {
    this.getOutputs();
    this.getReports();
    this.pageSettings();

    // Initialize Request Log From
    this.requestLogForm = this.fb.group({
      title: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    })

    this.rejectLogForm = this.fb.group({
      reason: ['', Validators.required],
    })
    // this.getLogframes()
}

pageSettings(){

  setTimeout(() => {
    $("#user-nav-tabs li").on("click", function (e) {
      const targetLink = $(e.currentTarget.children[0]).attr("class").slice(1);
      const content_map = {
        c1: "#content1",
        c2: "#content2",
        c3: "#content3",
      };
      $(e.currentTarget).siblings().removeClass("active");
      $.each(content_map, function (hash, elid) {
        if (hash == targetLink) {
          $(elid).show();
          $(e.currentTarget).addClass("active");
        } else {
          $(elid).hide();
        }
      });
    });
  }, 500);
}

getOutputs(){
  this.spinner.show();
  this.crud.getAuthData('outputs').subscribe((res: any) => {
    this.outputs = res.payload
    this.spinner.hide();
  },
  error => {
    this.spinner.hide();
  });
}


async sortByOutputs(id){
  if (id == this.output_id && this.projects) {
    return
  }
  this.output_id = id;
  this.getProjectsByOutputs('outputs', id);
  this.getOutpulDistribution('outputs', id);
}

async sortBySubOutputs(id){
  // if (id == this.sub_output_id && this.projects) {
  if (id == this.sub_output_id) {
    return
  }
  this.sub_output_id = id;
  this.getProjectsByOutputs('sub-outputs', id);
  this.getOutpulDistribution('sub-outputs', id);
}

async sortByReports(id){
  // if (id == this.output_id && this.projects) {
  if (id == this.output_id) {
    return
  }
  this.report_id = id;
  this.getOutputsByReports();
  this.getSubOutputsByReports()
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
    const reportData = XLSX.utils.sheet_to_json(worksheet, {header: ["component", "sub_component", "ouid", "title", "unit_of_measurement", "baseline", "actual", "target"]});
    this.reportData = reportData.splice(3)

    console.log(this.reportData);

  };
}

// pull list of logframes for calendar year
getProjectsByOutputs(endpoint, id){
  this.spinner.show()
  this.crud.getAuthData(`${endpoint}/${id}/projects`).subscribe(
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

// pull list of logframes for calendar year
getOutputsByReports(){
  this.spinner.show()
  this.crud.getAuthData(`reports/${this.report_id}/submissions/output`).subscribe(
    (res: any) => {
      this.submissions = res?.payload

      this.spinner.hide()
    },
    (error) => {
      this.spinner.hide()
      this.toastr.error(error.error.payload)
    }
  )
}

// pull list of logframes for calendar year
getSubOutputsByReports(){
  this.spinner.show()
  this.crud.getAuthData(`reports/${this.report_id}/submissions/sub-output`).subscribe(
    (res: any) => {
      this.sub_submissions = res?.payload
      this.spinner.hide()
    },
    (error) => {
      this.spinner.hide()
      this.toastr.error(error.error.payload)
    }
  )
}

submitReport() {
  const arr = Array.from(this.reportData, (({ ouid, actual }) => {return {ouid, actual}}))

  this.crud
    .postAuthData(`reports/${this.report}/outputs`, {reports: arr})
    .subscribe((res: any) => {
      this.toastr.success(res.payload);
      document.getElementById('closeReportUploadModal').click()
    },
    (err => this.toastr.error(err.payload)));
}

downloadTemplate(){
  this.spinner.show()
  this.crud.getAuthData(`outputs/downloads`).subscribe(
    (res: any) => {

      this.generateExcel(res?.payload)
      this.spinner.hide()
    },
    (error) => {
      this.spinner.hide()
      this.toastr.error(error.error.payload)
    }
  )
}


async generateExcel(payload) {

  //Excel Title, Header, Data


  //Create workbook and worksheet
  let workbook = new Excel.Workbook();
  let worksheet1 = workbook.addWorksheet('Activity Logframe');
  let w1 = await this.generateAL(worksheet1, payload)
  worksheet1 = w1
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'Report.xlsx');
  })
}

generateAL(worksheet, payload) {

  const header = [
    'component',
    'sub_component',
    "ouid",
    'title',
    'unit_of_measurement',
    'baseline',
    'actual',
    'target',
  ]

  const data = [
  ];
  let projects = payload;

  for (let index = 0; index < projects.length; index++) {
    const element = projects[index];

    let da = [
      element?.component || '',
      element?.sub_component || '',
      element?.ouid || '',
      element?.title || '',
      element?.unit || '',
      element?.baseline || '',
      '',
      element?.target || ''
    ]
    data.push(da);
  }
  worksheet.getCell('A1').alignment = { horizontal: 'center' };

  worksheet.mergeCells('A2:F2');
  worksheet.getCell('A2').value = 'SEISMIC';
  worksheet.getCell('A2').alignment = { horizontal: 'center' };
  worksheet.getCell('A2').font = {
    color: { argb: 'FF008000' },
    size: 15,
    bold: true
  }

  worksheet.mergeCells('A3:E3');
  worksheet.getCell('A3').value = 'PROJECT/PROGRAMME REPORTING TEMPLATE';
  worksheet.getCell('A3').alignment = { horizontal: 'center' };
  worksheet.getCell('A3').font = {
    color: { argb: 'FF008000' },
    size: 12,
    bold: true
  }
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

getOutpulDistribution(endpoint, id){
  this.spinner.show()
  this.crud.getAuthData(`${endpoint}/${id}/distributions`).subscribe(
    (res: any) => {
      this.indicator = res?.payload

      this.spinner.hide()
    },
    (error) => {
      this.spinner.hide()
      this.toastr.error(error.error.payload)
    }
  )
}

  getRandomColor(item) {
    if (item === "Pm") {
      return "#16C35B";
    }
    if (item === "rt") {
      return "#C93126";
    }
    if (item === "rep") {
      return "#8B83BA";
    }
    if (item === "db") {
      return "#24BDC7";
    }
    if (item === "fm") {
      return "#0f5798";
    }
    if (item === "st") {
      return "#455059";
    }
    return item;
  }

  submitRequestLog(){
    this.spinner.show()
    this.crud.postAuthData('reports', this.requestLogForm.value).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.toastr.success(res.payload)
        document.getElementById('closeRequestLogframeModal').click()
      },
      (error) => {
          this.spinner.hide()
          this.toastr.warning(error.payload)
        }
    )
  }

  submitStateReport(){
    // const reports = Array.from(this.submissions, (e: any) => ({id: e.id, actual: e.actual, output_id: e.output_id}))
    const reports = Array.from(this.submissions, (e: any) => ({id: e.id, actual: e.actual}))
    this.crud.postAuthData('reports/output/actual', {reports, report_id: this.report_id}).subscribe(
        (res: any) => {
            this.toastr.success(res.payload)
        },
        (error) => {
            this.toastr.warning(error.payload)
        }
    )
  }

  submitStateSubReport(){
    // const reports = Array.from(this.submissions, (e: any) => ({id: e.id, actual: e.actual, output_id: e.output_id}))
    const reports = Array.from(this.sub_submissions, (e: any) => ({id: e.id, actual: e.actual}))
    this.crud.postAuthData('reports/sub-output/actual', {reports, report_id: this.report_id}).subscribe(
        (res: any) => {
            this.toastr.success(res.payload)
        },
        (error) => {
            this.toastr.warning(error.payload)
        }
    )
  }

  submitReview(){
    this.logframes.forEach(e => {
      if(e.logframe_status == null)
        e.logframe_status = 'approved'
    })

    const obj = {
      "logframes": Array.from(this.logframes, (e: any) => ({id: e.id, status: e.logframe_status}))
    }

    this.spinner.show()
    this.logService.updateData('logframes', obj).subscribe(
      (res: any)=>{
        this.spinner.hide();
        this.toastr.success('The logframe has been Approved')
      },
      (error)=>{
        this.spinner.hide();
        this.toastr.error('The operation has failed, kindly try again');
      }
    );
  }

  getReports(){
    this.crud.getAuthData('reports').subscribe(
      (res: any) => {
        this.reports = res.payload;
      }
    )
  }
}

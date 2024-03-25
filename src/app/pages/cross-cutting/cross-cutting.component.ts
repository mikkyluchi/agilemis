import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddCcOuputComponent } from './modals/cc-ouputs/add-cc-ouput/add-cc-ouput.component';
import { EditCcOuputComponent } from './modals/cc-ouputs/edit-cc-ouput/edit-cc-ouput.component';
import { ViewCcOuputComponent } from './modals/cc-ouputs/view-cc-ouput/view-cc-ouput.component';
import * as Excel from "exceljs";
import * as fs from 'file-saver';
import * as XLSX from "xlsx";
import { WorkSheet } from "xlsx";
declare var $: any;

@Component({
  selector: 'cross-cutting',
  templateUrl: './cross-cutting.component.html',
  styleUrls: ['./cross-cutting.component.scss']
})
export class CrossCuttingComponent implements OnInit {
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
  activeYear: string;
  structureView: any = 'vertical'
  projectComponents: any;
  states: any;
  user: any;
  subComponents: any;
  reportFunction: any = '';
  reports: any;
  selectedReport: any;
  fileName: any;
  reportData: any;
  headers: any;
  issuesOutput: any;
  uploadedReports: any;
  years:any;
  quarters:any;
  constructor(private modalService: BsModalService, private router: Router, private toastr: ToastrService, private crud: CrudService, private spinner: NgxSpinnerService) {
    this.priorities = JSON.parse(localStorage.getItem('priorities'));
    this.activeYear = localStorage.getItem('activeYear')
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  ngOnInit() {
    this.getComponents();
    this.getSubComponents();
    this.getReports();
    this.getIssuesOutput();
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
  getIssuesOutput(){
    this.crud.getAuthData('issues-outputs').subscribe(
      (res:any) => {
        this.issuesOutput = res?.payload
      },
      (error: any) => {
      }
    )
  }

  getSubComponents(){
    this.crud.getAuthData('sub-components').subscribe(
      (res:any) => {
        this.subComponents = res?.payload
      },
      (error: any) => {
      }
    )
  }

  getComponents(){
    this.spinner.show()
    this.crud.getAuthData('issues/tree').subscribe(
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

  createOuput(data) {
    const initialState = {
      data: data,
      sub_components: this.subComponents,
    }
    const modalRef = this.modalService.show(AddCcOuputComponent, { class: '', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
  }

  editOutput(data) {
    const initialState = {
      data
    }
    const modalRef = this.modalService.show(EditCcOuputComponent, { class: '', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getComponents();
    })
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

  viewOutput(data){
    const initialState = {
      data: data,
    }
    this.modalService.show(ViewCcOuputComponent, { class: 'modal-xl', initialState });
  }

  performReportFunction(){
    if (this.reportFunction == 'download') {
      this.generateExcel(this.projectComponents);
      return;
    }

    document.getElementById('reportUploadModalBTN').click();
  }

  getReports(){
    this.crud.getAuthData('reports').subscribe(
      (res: any) => {
        this.reports = res.payload;
      }
    )
  }

  async generateExcel(payload) {
    let workbook = new Excel.Workbook();
    let worksheet1 = workbook.addWorksheet('Cross Cutting Issues Report');
    let w1 = await this.generateAL(worksheet1, payload)
    worksheet1 = w1
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Cross Cutting Issues Report.xlsx');
    })
  }

  generateAL(worksheet, payload) {

    const header = [
      'Cross Cutting Issue',
      'Indicators'
    ]

    this.subComponents.forEach(e => {
      header.push(e.title)
    });

    const data = [
    ];
    let projects = payload;

    projects.forEach(payload => {
      payload?.outputs.forEach(element => {
        let da = [
          payload?.title || '',
          element?.title || '',
        ]
        data.push(da);
      });
    });
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A2:I2');
    worksheet.getCell('A2').value = 'SEISMIC';
    worksheet.getCell('A2').alignment = { horizontal: 'center' };
    worksheet.getCell('A2').font = {
      color: { argb: 'FF008000' },
      size: 15,
      bold: true
    }

    worksheet.mergeCells('A3:I3');
    worksheet.getCell('A3').value = 'CROSS CUTTING ISSUES REPORTING TEMPLATE';
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

      cell.alignment = { wrapText: false };
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

  onfilechange(event: any) {

    const header = [
      'Cross Cutting Issue',
      'Indicators'
    ]

    this.subComponents.forEach(e => {
      header.push(e.title)
    });

    this.headers = header;

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
      const reportData = XLSX.utils.sheet_to_json(worksheet, {header});
      this.reportData = reportData.splice(3)
    };
  }

  submitReport(){
    const reports = [];
    this.subComponents
    this.reportData.forEach(e => {
      const sub_report = [];
      this.subComponents.forEach(i => {
        sub_report.push({
          "sub_component_id": i?.id,
          "value": e[i.title] || 0
        })
      });

      reports.push({
        cross_cutting_issue_output_id: this.issuesOutput.find(i => i.title == e.Indicators).id,
        reports: sub_report
      })
    });


    this.crud.postAuthData('issues-reports', {report_id: this.selectedReport, submissions: reports}).subscribe(
      (res: any) => {
        this.toastr.success(res.payload);
        this.getComponents();
        document.getElementById('closeModalBtn').click();
      },
      (error)=>{
        this.toastr.error(error.payload);
      }
    )
  }
}

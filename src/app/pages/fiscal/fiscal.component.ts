import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../../services/contracts/contracts.service';
import {FiscalService} from '../../services/fiscal/fiscal.service';
import {ToastrService} from 'ngx-toastr';
import {SettingsService} from '../../services/settings/settings.service';
import {FormGroup , FormBuilder , Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
declare var $: any;
import * as XLSX from 'xlsx';
import {formatNumber} from '@angular/common';
// import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
@Component({
    selector: 'upgrade-cmp',
    moduleId: module.id,
    templateUrl: 'fiscal.component.html',
  styleUrls: ['./fiscal.component.css']
})

export class FiscalComponent implements OnInit {
  term: any;
  mdasList;
  public isEditable = true;

  tempArr: any = [];
  newArr: any = []
  years: any[] = [2022, 2021, 2020, 2019];
  release: any[] = ['First Release', 'Second Release', 'Third Release', 'Fourth Release'];
  data: [] [];
  fileName ;
  showBtn = false ;
  showBdgtBtn = true ;
  allBudgetdata: any;
  isChecked = false;
  allReleasedata: any;
  array: any = [];
  placeHolder = 'Select';
  query: any;
  bdgtQuery: any;
  private dataObj = [];
  parentSelector: false;
  selectedRelease: any ;
  selectedMda

  releaseForm: FormGroup;

  p: number;
  selectYear: any;
  releaseQuery: any;
  query1: any;
   bdgtId: any;
  selectMdas: any;
 file: File ;
 arrayBuffer: any;
   arraylist: any[];
  private budgetYear: number;
  activeYear ;
  private currentUserObj: any;
  Mdas: any;
  selectRelease: any;
   showPurgeMinistryBtn = false;
  showPurgeBtn = false ;
  showSearchbar = true ;
  quarter: any;
  selectMda: any;
  editableBudget: any;
  editForm: FormGroup;
  submitEditFormDataStatus = false;
  // config: NgWizardConfig = {
  //   selected: 0,
  //   theme: THEME.circles,
  //   toolbarSettings: {
  //     toolbarExtraButtons: [
  //       { text: 'Finish', class: 'btn btn-info', event: () => { alert('Finished!!!'); }
  //       }]
  //   }}



  // constructor( public ngWizardService: NgWizardService , private fiscalManagement: FiscalService, private spinner: NgxSpinnerService, private fb: FormBuilder, private setting_service: SettingsService, private toastr: ToastrService) {
  constructor( private fiscalManagement: FiscalService, private spinner: NgxSpinnerService, private fb: FormBuilder, private setting_service: SettingsService, private toastr: ToastrService) {

  }

  ngOnInit() {
    // this.getRelase( ) ;
    this.setBudgetyear();
    this.getBudget();
    this.getMdasList();

    // $(document).ready(function() {
    //    const progressBarVal = 40;
    //   const html = '<div class=\'progress-bar progress-bar-striped active\' role=\'progressbar\' aria-valuenow=' + progressBarVal + ' aria-valuemin=\'0\' aria-valuemax=\'100\' style=\'width:' + progressBarVal + '%\'>' + progressBarVal + '%</div>';
    //   $('.progress').append(html);
    // });

    this.releaseForm = this.fb.group({
      released : [''],
      year : [''],
      file : ['', Validators.required]
    })

    this.editForm = this.fb.group({
      id : ['', Validators.required],
      budget_code : ['', Validators.required],
      budget_line_item : ['', Validators.required],
      amount : ['', Validators.required],
      mda_id : ['', Validators.required],
      year : ['', Validators.required],
    })


    $(document).ready(function () {
      $('.btn').on('click', function () {
        $('.file').trigger('click');
      });
      $('.file').on('change', function () {
        const fileName = $(this)[0].files[0].name;
        $('#files-name').val(fileName);
      });

      $('#nexts').on('click', () => {
        $('.content1').addClass('d-none')
        $('.content2').removeClass('d-none')
        $('#nexts').addClass('d-none')
        $('#nexts1').removeClass('d-none')

        $('#number2').addClass('active')
      })

      $('#nexts1').on('click', () => {
        $('.content2').addClass('d-none')
        $('.content3').removeClass('d-none')
        $('#nexts1').addClass('d-none')
        $('#nexts2').removeClass('d-none')
        $('#number3').addClass('active')
      })

    });

    $(document).ready(function () {
      $('.btn').on('click', function () {
        $('.file').trigger('click');
      });
      $('.file').on('change', function () {
        const fileName = $(this)[0].files[0].name;
        $('#file-name').val(fileName);
      });

      $('#next').on('click', () => {
        $('.content1').addClass('d-none')
        $('.content2').removeClass('d-none')
        $('#next').addClass('d-none')
        $('#next1').removeClass('d-none')
        $('#num2').addClass('active')
      })

      $('#next1').on('click', () => {
        $('.content2').addClass('d-none')
        $('.content3').removeClass('d-none')
        $('#next1').addClass('d-none')
        $('#next2').removeClass('d-none')
        $('#num3').addClass('active')
      })

    });

    $('#user-nav-tabs li').on('click', function (e) {
      const targetLink = $(e.currentTarget.children[0]).attr('class').slice(1);
      const content_map = {
        c1: '#content1',
        c2: '#content2',
        c3: '#content3',
        c4: '#content4',
        c5: '#content5',
        c6: '#content6'
      }
      $(e.currentTarget).siblings().removeClass('active');
      $.each(content_map, function (hash, elid) {
        if (hash == targetLink) {
          $(elid).show();
          $(e.currentTarget).addClass('active');
        } else {
          $(elid).hide();
          $('#content3').show()
        }
      });
    });

    $('#fiscal-nav-tabs li').on('click', function (e) {
      const targetLink = $(e.currentTarget.children[0]).attr('class').slice(1);
      const content_map = {
        c1: '#content1',
        c2: '#content2',
        c3: '#content3',
        c4: '#content4',
        c5: '#content5',
        c6: '#content6'
      }
      $(e.currentTarget).siblings().removeClass('active');
      $.each(content_map, function (hash, elid) {
        if (hash === targetLink) {
          $(elid).show();
          $('#content2').show()
          $(e.currentTarget).addClass('active');
        } else {
          $(elid).hide();
        }
      });
    });
  }

  getData(){
    if(this.showBtn){
      this.getRelase(this.quarter)
      return
    };
    if (this.showBdgtBtn) {
      this.getBudget();
    }
  }

  get eb(){
    return this.editForm.controls;
  }

  resetWizard(event?: Event) {
    this.selectMdas = '';
    this.fileName = '';
    this.arraylist = [];
    // this.ngWizardService.reset();
    this.getMdasList();
  }
setBudgetyear() {
  this.currentUserObj = JSON.parse(sessionStorage.getItem('user'));
  this.activeYear = this.currentUserObj.active_year;
}
  updateBudgetArray(item: any) {
     const index = this.arraylist.indexOf(item);
    item.budget_code = item.budget_code;
    this.arraylist[index] = item;
    this.setBudgetTable();
  }

  async createBudget() {
    console.log(this.arraylist);
    for await (const currentValue of this.arraylist) {
      currentValue.mda_id = this.selectMdas[0].id;
      currentValue.year = this.activeYear ;
      console.log(currentValue);
      this.spinner.show();
      this.fiscalManagement.createBudget(currentValue).subscribe(
        (res: any) => {
          $('#createbudgetModal').modal('hide');
          this.spinner.hide();
        },
        (error) => {
          this.toastr.error(error.message)
        });
        setTimeout(() => {
        }, 200);
        
      }

      this.getBudget();
      this.spinner.hide();
      this.toastr.success('Operation completed successfully');
  }

  // Create release


  createRelease( ) {
    let errorStatus = '';
    this.arraylist.forEach((currentValue, index) => {
      currentValue.budget = currentValue.appropriated ;
      currentValue.year = this.activeYear;
      currentValue.mda_id = this.mdasList.filter(e => currentValue.mda_shortcode == e.shortcode)[0]?.id

      if (!currentValue.mda_id) {
        errorStatus = currentValue.mda_shortcode
      }

      delete currentValue.mda_shortcode
    })
    
    if (errorStatus) {
      alert(`You have entered an incorrect release item, kindly correct this MDA short code (${errorStatus})`)
      return
    }

    this.arraylist.forEach(e => {
      this.spinner.show();
      this.fiscalManagement.createRelease(e).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.toastr.success(res.message);
          $('#createreleaseModal').modal('hide');
          this.getRelase(e.quarter);
          this.spinner.hide();
        },
        (error) => {
          this.toastr.error(error.message)
          this.spinner.hide();
        })
    })
  }

  delReleaseTableData (rownum: any) {

    this.arraylist.forEach((value, index) => {
      if (value.__rowNum__ === rownum) { this.arraylist.splice(index, 1); }
    });
  }

  getBudget() {
    this.spinner.show();
    this.fiscalManagement.getBudgetByYear(this.activeYear).subscribe(
      (res: any) => {
        this.toastr.success(res.status)
        this.allBudgetdata = res.data;
        this.setBudgetList();
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error(error.message)
        this.spinner.hide();
      });
  }

  searchBudget( ) {
    this.fiscalManagement.searchBudget(this.query).subscribe(
      (res: any) => {
        this.allBudgetdata = res.data;
        this.toastr.success(res.message);
      })
  }
  searchRelease() {

    this.fiscalManagement.searchRelease(this.query).subscribe(
      (res: any) => {
        this.allReleasedata = res.data;
        this.toastr.success(res.message);
      })
  }



  getMdasList() {
    this.setting_service.getMdas().subscribe(
      (res: any) => {
        this.mdasList = res.data
        console.log(res.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }

   numberWithCommas(x) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  getRelase(item: any) {

    this.showBtn = true ;
    this.showBdgtBtn = false ;
    this.showPurgeMinistryBtn = true ;
    this.showPurgeBtn = true;
    this.showSearchbar = false ;
    this.releaseQuery = '';
    this.quarter = item ;

    this.spinner.show();
    this.fiscalManagement.getReleaseByQuarter({quarter: item, year: this.activeYear}).subscribe(
      (res: any) => {
        this.toastr.success(res.status)

        this.allReleasedata = res.data;
        this.allReleasedata.forEach((currentValue, index) => {

          currentValue.rate = ((currentValue.utilized / currentValue.released) * 100).toFixed(2);


         currentValue.rate = this.numberWithCommas(currentValue.rate);
         /* currentValue.mda = '1234';
          let mda_id = parseInt(currentValue.mda_id);
            this.mdasList.forEach((mda, i) => {
              if (mda_id === mda.id) {
                 currentValue.mda =  mda.shortcode
               }else {
                currentValue.mda = '1234';
              }
            });*/
        });
        this.array = this.allReleasedata;
        console.log('allReleasedata', this.allReleasedata);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.log(error)
      });

  }


  checkuncheckall() {
    if (this.isChecked === true) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }

  }

  getCheckboxData(event) {
    const id = event.target.value;
    if (event.target.checked) {
     this.tempArr = this.array.filter((e: any) => e.id == event.target.value);
     this.newArr.push(this.tempArr);
      console.log(this.newArr);

    }


  }

  onfilechange(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name ;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {type: 'binary'});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, {raw: true}));
       this.arraylist = XLSX.utils.sheet_to_json(worksheet, {raw: true});
      event.target.value = '';
 this.setBudgetTable();
    }

  }


  budgetId(id: any) {
    this.bdgtId = id;
  }

  deleteBudget() {
    this.fiscalManagement.deleteBudget(this.bdgtId).subscribe(
      (res: any) => {
       this.getBudget();
      });
    $('#delbudgetModal').modal('hide');
  }
  setBudgetList() {
    this.allBudgetdata.forEach((currentValue, index) => {
      currentValue.isEditable = false;
      currentValue.isShowDiv = true ;
    });
  }
  // set file upload data budget
  setBudgetTable() {
    this.selectMdas = this.mdasList.filter(e => e.id == this.selectMda);
    this.arraylist.forEach((currentValue, index) => {
      currentValue.isEditable = false;
    });
  }

  //edit budget on upload file
  editBudgetTable(item) {
    console.log(item);
    this.setBudgetTable();
    this.arraylist.forEach((currentValue, index) => {
      if (item.__rowNum__ === currentValue.__rowNum__) {
        currentValue.isEditable = true;

      }
    });
  }

  editBudget(item: any) {
    this.editableBudget = item;
    this.editForm.patchValue({
      id : item?.id,
      budget_line_item : item?.budget_line_item,
      budget_code : item?.budget_code,
      amount : item?.amount,
      mda_id : item?.mda_id,
      year : item?.year,
    })
  }
  updateBudget() {
    this.submitEditFormDataStatus = true;
    if (this.editForm.invalid) {
      return;
    }

    this.setBudgetList();
     this.fiscalManagement.updateBudget(this.editForm.value).subscribe(
       (res: any) => {
         this.toastr.success(res.message);
         this.submitEditFormDataStatus = false;
         $('#editBudgetModal').modal('hide');
         this.getBudget();
       },
       (error) => {
        this.spinner.hide();
        this.toastr.error(error.message);
      });
  }
  delBudgetTableData(rownum: any) {

    this.arraylist.forEach((value, index) => {
      if (value.__rowNum__ === rownum) { this.arraylist.splice(index, 1); }
    });
  }

  purgeByMinistry() {
    const dataObj = {
      mda_id: this.selectMda,
      year: this.activeYear
    }
    this.fiscalManagement.deleteBudgetByMdas(dataObj).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.getBudget();
      });
    $('#purgeministryModal').modal('hide');
  }
  toggleBtn() {
    this.showBtn = false;
    this.showBdgtBtn =  true;
    this.showPurgeBtn = false;
    this.showPurgeMinistryBtn = false ;
    this.showSearchbar = true ;
    this.query = '';
  }
  purgeByYear() {

    this.fiscalManagement.deleteBudgetByYear(this.activeYear).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.getBudget();
      });
    $('#purgeyearModal').modal('hide');
  }
  // Show mda in budget upload table


  showMdaBdgtTable() {
    this.Mdas = this.selectMdas[0].name;
  }

  purgeByMinistryRelease() {
    const dataObj = {
      mda_id: this.selectMdas[0].id,
      year:  this.activeYear
    }
    this.fiscalManagement.deleteReleaseByMdas(dataObj).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
       this.getRelase(this.quarter);
      });
    $('#purgeministryReleaseModal ').modal('hide');
    console.log(dataObj);
  }

  purgeReleaseByYear() {
    this.fiscalManagement.deleteReleaseByYear(this.activeYear).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.getRelase(this.quarter);

      });
    $('#purgeyearReleaseModal').modal('hide');
  }

  releaseModalReset() {
    this.selectedRelease = '';
    this.fileName = '';
    this.arraylist = [];
    $('.content1').removeClass('d-none');
    $('.content2').addClass('d-none');
    $('.content3').addClass('d-none');
    $('#nexts').removeClass('d-none');
    $('#nexts1').addClass('d-none');
    $('#number1').addClass('active');
    $('#number2').removeClass('active');
    $('#number3').removeClass('active');

  }

  resetPurgeMinistry() {
    this.selectMdas = '';
  }


  // Previous release screen
  previousScreen() {
    $('.content1').removeClass('d-none');
    $('.content2').addClass('d-none');
    $('.content3').addClass('d-none');
    $('#nexts').removeClass('d-none');
    $('#nexts1').addClass('d-none');
    $('#number1').addClass('active');
    $('#number2').removeClass('active');
    $('#number3').removeClass('active');
  }

  previousBdgtScreen() {
    $('.content1').removeClass('d-none');
    $('.content2').addClass('d-none');
    $('.content3').addClass('d-none');
    $('#next').removeClass('d-none');
    $('#next1').addClass('d-none');
    $('#num1').addClass('active');
    $('#num2').removeClass('active');
    $('#num3').removeClass('active');
  }
}

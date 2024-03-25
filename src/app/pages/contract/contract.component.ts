import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../../services/contracts/contracts.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SettingsService} from '../../services/settings/settings.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {FiscalService} from '../../services/fiscal/fiscal.service';
import {ModalComponent} from '../modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  currentTab = 'Contracts';
  contractQuery: any;
  contractorQuery: any;
  placeHolder = 'Select';

  contractorForm: FormGroup;




  allcontractdata;
  allcontractordata;
  currencySymbol: any ;
  contractorModalTitle = 'Add Contractor';
  contractorModalBtn = 'Add Contractor';
  contractorId: any;
  mdasList: any;
  contractId: any;
  contractModalTitle = 'Add Contract';
  contractModalBtn = 'Add Contract';
  toggleSearch = true;
  selectedMdas: any;
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    showCancel: false,
    showClearButton: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false,
    customRangeDirection: true,
    lockStartDate: false,
    closeOnAutoApply: true
  };
  output: any [];
  budgetItem: any [];
  states: any;
  private allBudgetdata: any;
  constructor(private contract_service: ContractsService,public modalService: NgbModal, private spinner: NgxSpinnerService, private setting_service: SettingsService, private fiscal_service: FiscalService , private fb: FormBuilder, private toastr: ToastrService) {

  }

  setCurrentTabValue(val) {
    this.currentTab = val;
  }

  ngOnInit(): void {

    this.getContracts()
    this.getContractors();
    this.getMdasList();
    this.getStatesList();


    // $(function () {
    //   $('input[name="daterange"]').daterangepicker({
    //     opens: 'left'
    //   }, function (start, end, label) {
    //     console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    //   });
    // });
    this.contractorForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      cac_no: ['', Validators.required],
      state: ['', Validators.required]

    });

    $(document).ready(function () {
      setTimeout(function () {
        $(function () {
          $('#contractTable').DataTable({
            paging: true,
            searching: false,
            'autoWidth': false,
            'lengthChange': true,
            'sDom': 'Rfrtlip',
            'bInfo': false,
            'ordering': false,
            'pageLength': 20,
            'lengthMenu': [20, 30, 50, 75, 100],
            'oLanguage': {
              'oPaginate': {
                'sPrevious': `<i class="nc-icon nc-minimal-left font-weight-bold"></i>`,
                'sNext': `<i class="nc-icon nc-minimal-right font-weight-bold"></i>`
              }
            },
            'language': {
              'lengthMenu': 'Show _MENU_'
            }
          });
        });
      }, 1000);

      setTimeout(function () {
        $(function () {
          $('#contractorsTable').DataTable({
            paging: true,
            searching: false,
            'autoWidth': false,
            'lengthChange': true,
            'sDom': 'Rfrtlip',
            'bInfo': false,
            'ordering': false,
            'pageLength': 20,
            'lengthMenu': [20, 30, 50, 75, 100],
            'oLanguage': {
              'oPaginate': {
                'sPrevious': `<i class="nc-icon nc-minimal-left font-weight-bold"></i>`,
                'sNext': `<i class="nc-icon nc-minimal-right font-weight-bold"></i>`
              }
            },
            'language': {
              'lengthMenu': 'Show _MENU_',
            }
          });
        })
      }, 1000)

    });


    $('#user-nav-tabs li').on('click', function (e) {
      const targetLink = $(e.currentTarget.children[0]).attr('class').slice(1);
      const content_map = {
        c1: '#content1',
        c2: '#content2',
        c3: '#content3',
        c4: '#content4',
        c5: '#content5'
      }
      $(e.currentTarget).siblings().removeClass('active');

      // if(e.currentTarget.innerText==="Contractors"){
      //   debugger;
      //   this.currentTab="Contractors";
      // }else{
      //   debugger;
      //   this.currentTab="Contracts";
      // }
      $.each(content_map, function (hash, elid) {
        if (hash == targetLink) {
          $(elid).show();
          $(e.currentTarget).addClass('active');
        } else {
          $(elid).hide();
        }
      });
    });
  }

  getContracts() {
    this.toggleSearch = true;
    this.contractQuery = '';
    this.spinner.show();
    this.contract_service.getContracts().subscribe(
      (res: any) => {
        this.allcontractdata = res.data.data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error)
      })
  }

  getContractors() {
    this.toggleSearch = false;
    this.contractorQuery = '';
    this.spinner.show();
    this.contract_service.getContractors().subscribe(
      (res: any) => {
        this.allcontractordata = res.data.data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error)
      })
  }

  //


  // SearchByParams(): void {
  //   debugger;
  //
  //   const valueToSearch = $('#SearckKeyword').val();
  //   if (this.currentTab != '' && this.currentTab === 'Contractors') {
  //     this.contract_service.searchContractors(valueToSearch).subscribe(
  //       (res: any) => {
  //         console.log(res.data)
  //         this.allcontractordata = res.data
  //       },
  //       (error) => {
  //         console.log(error)
  //       })
  //
  //   } else if (this.currentTab != '' && this.currentTab === 'Contracts') {
  //     this.contract_service.searchContracts(valueToSearch).subscribe(
  //       (res: any) => {
  //         console.log(res.data)
  //         this.allcontractdata = res.data
  //       },
  //       (error) => {
  //         console.log(error)
  //       })
  //   }
  // }

  getBudgetByYear() {
    this.fiscal_service.getBudgetByYear('2019').subscribe(
      (res: any) => {
        this.toastr.success(res.status)
        this.allBudgetdata = res.data
      },
      (error) => {
        console.log(error)
      });
  }

  editContracts(item) {
    this.contractModalTitle = 'Update contract';
    this.contractModalBtn = 'Update contract';
    this.contractId = item.id;
    // this.contractForm.patchValue(item);
  }

  createContractor(contractorForm: FormGroup) {

    if (contractorForm.valid) {
      const dataObj = contractorForm.value;
      if (!this.contractorId) {
        this.contract_service.createContractors(dataObj).subscribe(
          (res: any) => {
            this.toastr.success('Add successfully');
            this.getContractors();
            $('#createContractorModal').modal('hide');
          },
          (error) => {
            this.toastr.error('Something went wrong');
          });
        } else {
          dataObj.id = this.contractorId;
          this.contract_service.editContractors(dataObj).subscribe(
            (res: any) => {
              this.toastr.success('Updated Successfully');
              this.getContractors();
              $('#createContractorModal').modal('hide');
            },
          (error) => {
            this.toastr.error('Something went wrong');
          });
      }

    }
  }

  editContractors(item: any) {
    this.contractorModalTitle = 'Update contractor';
    this.contractorModalBtn = 'Update contractor';
    this.contractorId = item.id;
    this.contractorForm.patchValue(item);
  }

  deleteContractor() {
    this.contract_service.deleteContractors(this.contractorId).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.getContractors();
        $('#delContractorModal').modal('hide');
      });
  }

  getStatesList() {
    this.setting_service.getStates().subscribe(
      (res: any) => {
        this.states = res.payload
      },
      (error) => {
        console.log(error)
      })
  }

  getMdasList() {
    this.setting_service.getMdas().subscribe(
      (res: any) => {
        this.mdasList = res.data
      },
      (error) => {
        console.log(error)
      })
  }

  contractorformReset() {
    this.contractorForm.reset();
    this.contractorModalTitle = 'Add Contractor';
    this.contractorModalBtn = 'Add Contractor';
  }

  getContractorId(id) {
    this.contractorId = id;
  }


  // createContract(contractForm: FormGroup) {
  //   console.log(contractForm.value);
  // }

//  Create Project

  // createProject(contractForm: FormGroup) {
  //   const userData = JSON.parse(sessionStorage.getItem('user')) ;
  //   const projectData = contractForm.value;
  //   projectData.active = 2;
  //   projectData.contractor_id = 2;
  //   projectData.output_id = 3;
  //   projectData.user_id = userData.id;
  //   projectData.currency = this.currencySymbol;
  //   projectData.mda_id = contractForm.value.mda[0].id;
  //
  //   this.contract_service.createProjects(projectData).subscribe(
  //     (res: any) => {
  //       this.toastr.success(res.message);
  //
  //     });
  //
  // }

  getOutputByMdaID() {
    const Mda_id = this.selectedMdas[0].id ;
    this.contract_service.getOutputByMdaID(Mda_id).subscribe(
      (res: any) => {
        this.output = res.data ;
        this.toastr.success(res.message);
        this.getBudgetByYear();
      });

  }

  openProjectModal() {
    const modalRef = this.modalService.open(ModalComponent);
  }
}

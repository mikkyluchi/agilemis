import { AnalyticService } from "../services/analytic/analytic.service";
import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from "src/app/shared/services/crud.service";
import { AuthService } from "../services/auth/auth.service";
Chart.register(...registerables);
declare var $: any;

@Component({
  selector: 'analyticsdashboardonly',
  templateUrl: './analyticsdashboardonly.component.html',
  styleUrls: ['./analyticsdashboardonly.component.scss']
})
export class AnalyticsdashboardonlyComponent implements OnInit {

  statespdoi = true;
  pdos:any;
  subpdos:any;
  user;
  form: FormGroup;
  public rawData: any;
  public budgetChart: any;
  priorityChart: any;
  reportRateValue: any;
  projects: any;
  finance: any;
  stats: any;
  currentUserObj;
  states: any;
  subComponents: any;
  state_id: any = '';
  sub_component_id: any = '1';
  outputStats: any;
  selectedYear = '';
  selectedQuarter = '';
  selectedState='';
  years = [];
  highcharts = Highcharts;
  ioiChartsOptions:any;
  pdoChartsOptions: any;
  pdoStateChartsOptions: any;
  crossCuttingOptions: any;
  currentReport = 'indicator'
  pdoStats: any;
  ipdoStats: any;
  pdoStatesStats: any;
  sub_components: any;
  indicators:any;
  iindicators:any;
  sindicators:any;
  statss:any;
  quarters = [
    {
      'id':'1',
      'title':'Quarter One'
    },
    {
      'id':'2',
      'title':'Quarter Two'
    },
    {
      'id':'3',
      'title':'Quarter Three'
    },
    {
      'id':'4',
      'title':'Quarter Four'
    }
  ];
  iComponents = [
    {
      'id':'1',
      'title':'INTERMEDIATE OUTCOME INDICATORS COMPONENT 1'
    },
    {
      'id':'2',
      'title':'INTERMEDIATE OUTCOME INDICATORS COMPONENT 2'
    },
    {
      'id':'3',
      'title':'INTERMEDIATE OUTCOME INDICATORS COMPONENT 3'
    },
    {
      'id':'4',
      'title':'INTERMEDIATE OUTCOME INDICATORS COMPONENT 4'
    }
  ];
  
  constructor(private auth: AuthService,public fb: FormBuilder, private AnalyticService: AnalyticService, private crud: CrudService, private spinner: NgxSpinnerService) {
    for (let index = 0; index < new Date().getFullYear() - 2020; index++) {
      this.years.push(new Date().getFullYear() - index);
    }
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.currentUserObj = JSON.parse(sessionStorage.getItem("user"));
  }
  public canvas: any;
  public gauge: any;
  public ctx;
  public chartColor;
  public chartHours;
  activeQtr = 'All';
  pdo_indicator_id = '1';
  sub_pdo_indicator_id = '1';
  login_data = {
    "email":"admin@npcu.com",
    "password":"pass1234"
  }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(!this.user){
      this.spinner.show();
      this.auth.login(this.login_data).subscribe(
        (res:any)=>{ 
          if (res.status === true){
            
            sessionStorage.setItem('token',res.payload.token)
            sessionStorage.setItem('user',JSON.stringify(res.payload.user))
            this.user = JSON.parse(sessionStorage.getItem("user"));
            this.currentUserObj = JSON.parse(sessionStorage.getItem("user"));
            this.spinner.hide();
            window.location.reload();
            this.initAll()
            
          }
          else{
            $(".login-details form input").addClass('error-input')
            setTimeout(()=>{
              $(".login-details form input").removeClass('error-input')
            }, 2000);
          }
        },
        (error)=>{
          this.spinner.hide();
          $(".login-details form input").addClass('error-input')
          setTimeout(()=>{
                $(".login-details form input").removeClass('error-input')
          }, 2000)
        }
      )
    }else{
      this.initAll()
    }
    
  }
  initAll(){
    $(document).ready(function () {
      $("#myTable").DataTable({
        paging: false,
        searching: false,
      });
    });
    this.getDashboardSummaryOne();
    // this.initBudgetChart()
    this.getStates();
    this.getSubComponents();
    this.getQuarters();
    this.getYears();
    this.initForm();
    this.submit();
    this.getIPDOStats();
    this.getIndicators();
    this.getSIndicators();
    this.getPDOStatesStats();
    this.getPDOStats();
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
  initForm() {
    this.form = this.fb.group({
      year: '',
      quarter: '',
      sub_component_id: '1',
      state_id: '',
      sub_component_id_c:'1'
    })
  }
  getSubPDOStats() {
    // this.spinner.show()
    // if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
    //   this.state_id = undefined
    // }
    // this.crud.getAuthData(`analytics/sub-indicators?${(this.state_id) ? 'state_id=' + this.state_id : ''}`).subscribe(
    //   (res: any) => {
    //     this.pdoStats = res?.payload;
    //     console.log(this.pdoStats);
    //     const arrayOfPDOs = Array.from(this.pdoStats, ((e: any) => e.title))
    //     const arrayObjOfBaseline = {
    //       name: 'Baseline',
    //       data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.baseline)))
    //     }
    //     const arrayObjOfTarget = {
    //       name: 'Target',
    //       data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.target)))
    //     }
    //     const arrayObjOfActual = {
    //       name: 'Actual',
    //       data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.actual)))
    //     }

    //     this.initStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
    //     this.spinner.hide();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // )
    this.spinner.show();
    this.crud.postCCCCAuthData('outcomes/subpdograph', {selectedYear:this.selectedYear,selectedQuarter:this.selectedQuarter,state_id:this.state_id,sub_component_id:this.sub_component_id}, sessionStorage.getItem('user')).subscribe(
      (res: any) => {

          this.pdoStats = res?.payload;
          this.indicators =  res?.payload;
          const arrayOfPDOs = Array.from(this.pdoStats, ((e: any) => e.title))
          
          const arrayObjOfBaseline = {
            name: 'Baseline',
            data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.baseline)))
          }
          const arrayObjOfTarget = {
            name: 'Target',
            data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.target)))
          }
          const arrayObjOfActual = {
            name: 'Actual',
            data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.actual)))
          }

          console.log(arrayObjOfBaseline,arrayObjOfTarget,arrayObjOfActual,'jujuju')

          this.initStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
          this.spinner.hide();

      },
      (error) => {

      }
    )
  }
  
  getPDOStats() {
    // this.spinner.show()
    // if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
    //   this.state_id = undefined
    // }
    // this.crud.getAuthData(`analytics/indicators?${(this.state_id) ? 'state_id=' + this.state_id : ''}`).subscribe(
    //   (res: any) => {
    //     this.pdoStats = res?.payload;
    //     this.indicators =  res?.payload;
    //     const arrayOfPDOs = Array.from(this.pdoStats, ((e: any) => e.title))
    //     const arrayObjOfBaseline = {
    //       name: 'Baseline',
    //       data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.baseline)))
    //     }
    //     const arrayObjOfTarget = {
    //       name: 'Target',
    //       data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.target)))
    //     }
    //     const arrayObjOfActual = {
    //       name: 'Actual',
    //       data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.actual)))
    //     }

    //     this.initStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
    //     this.spinner.hide();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // )
    this.spinner.show();
    this.crud.postCCCCAuthData('outcomes/pdograph', {selectedYear:this.selectedYear,selectedQuarter:this.selectedQuarter,state_id:this.state_id,sub_component_id:this.sub_component_id}, sessionStorage.getItem('user')).subscribe(
      (res: any) => {

          this.pdoStats = res?.payload;
          this.indicators =  res?.payload;
          const arrayOfPDOs = Array.from(this.pdoStats, ((e: any) => e.title))
          
          const arrayObjOfBaseline = {
            name: 'Baseline',
            data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.baseline)))
          }
          const arrayObjOfTarget = {
            name: 'Target',
            data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.target)))
          }
          const arrayObjOfActual = {
            name: 'Actual',
            data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.actual)))
          }

          console.log(arrayObjOfBaseline,arrayObjOfTarget,arrayObjOfActual,'jujuju')

          this.initStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
          this.spinner.hide();

      },
      (error) => {

      }
    )
  }
  getIPDOStats() {
    
    this.spinner.show();
    if(this.currentUserObj.roles[0].name == 'state'){
      this.crud.postCCCCAuthData('outcomes/ipdographstate', {selectedYear:this.selectedYear,selectedQuarter:this.selectedQuarter,state_id:this.state_id,sub_component_id:this.sub_component_id}, sessionStorage.getItem('user')).subscribe(
        (res: any) => {
  
            this.ipdoStats = res?.payload;
            this.iindicators =  res?.payload;
            const arrayOfPDOs = Array.from(this.ipdoStats, ((e: any) => e.title))
            
            const arrayObjOfBaseline = {
              name: 'Baseline',
              data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.baseline)))
            }
            const arrayObjOfTarget = {
              name: 'Target',
              data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.target)))
            }
            const arrayObjOfActual = {
              name: 'Actual',
              data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.actual)))
            }
  
            console.log(arrayObjOfBaseline,arrayObjOfTarget,arrayObjOfActual,'jujuju')
  
            this.initIStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
            this.spinner.hide();
  
        },
        (error) => {
  
        }
      )
    }else{

      this.crud.postCCCCAuthData('outcomes/ipdograph', {selectedYear:this.selectedYear,selectedQuarter:this.selectedQuarter,state_id:this.state_id,sub_component_id:this.sub_component_id}, sessionStorage.getItem('user')).subscribe(
        (res: any) => {
  
            this.ipdoStats = res?.payload;
            this.iindicators =  res?.payload;
            const arrayOfPDOs = Array.from(this.ipdoStats, ((e: any) => e.title))
            
            const arrayObjOfBaseline = {
              name: 'Baseline',
              data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.baseline)))
            }
            const arrayObjOfTarget = {
              name: 'Target',
              data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.target)))
            }
            const arrayObjOfActual = {
              name: 'Actual',
              data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.actual)))
            }
  
            console.log(arrayObjOfBaseline,arrayObjOfTarget,arrayObjOfActual,'jujuju')
  
            this.initIStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
            this.spinner.hide();
  
        },
        (error) => {
  
        }
      )

    }
    
  }
  getDashboardSummaryOne(){
    //if state person
    if(this.currentUserObj.roles[0].name == 'state'){
      this.crud.postCCCCAuthData('outcomes/dashboardsummaryonestate', {user_id:this.currentUserObj.id,sub_component_id:this.sub_component_id}, sessionStorage.getItem('user')).subscribe(
        (res: any) => {
          this.statss = res;
  
        },
        (error) => {
  
        }
      )
    }else{
      this.crud.postCCCCAuthData('outcomes/dashboardsummaryone', {state_id:this.state_id,sub_component_id:this.sub_component_id}, sessionStorage.getItem('user')).subscribe(
        (res: any) => {
          this.statss = res;
  
        },
        (error) => {
  
        }
      )
    }
  }
  getPDOStatesStats() {
    this.spinner.show()
    // if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
    //   this.state_id = undefined
    // }
    this.spinner.show();
    this.crud.postCCCCAuthData('outcomes/spdograph', {selectedYear:this.selectedYear,selectedQuarter:this.selectedQuarter,pdo_indicator_id:this.pdo_indicator_id}, sessionStorage.getItem('user')).subscribe(
      (res: any) => {

          this.ipdoStats = res?.payload;
          this.iindicators =  res?.payload;
          const arrayOfPDOs = Array.from(this.ipdoStats, ((e: any) => e.title))
          
          const arrayObjOfBaseline = {
            name: 'Baseline',
            data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.baseline)))
          }
          const arrayObjOfTarget = {
            name: 'Target',
            data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.target)))
          }
          const arrayObjOfActual = {
            name: 'Actual',
            data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.actual)))
          }

          console.log(arrayObjOfBaseline,arrayObjOfTarget,arrayObjOfActual,'jujuju')

          this.initStateStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
          this.spinner.hide();

      },
      (error) => {

      }
    )
  }
  getSubPDOStatesStats() {
    this.spinner.show()
    // if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
    //   this.state_id = undefined
    // }
    this.spinner.show();
    this.crud.postCCCCAuthData('outcomes/ssubpdograph', {selectedYear:this.selectedYear,selectedQuarter:this.selectedQuarter,sub_pdo_indicator_id: this.sub_pdo_indicator_id}, sessionStorage.getItem('user')).subscribe(
      (res: any) => {

          this.ipdoStats = res?.payload;
          this.iindicators =  res?.payload;
          const arrayOfPDOs = Array.from(this.ipdoStats, ((e: any) => e.title))
          
          const arrayObjOfBaseline = {
            name: 'Baseline',
            data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.baseline)))
          }
          const arrayObjOfTarget = {
            name: 'Target',
            data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.target)))
          }
          const arrayObjOfActual = {
            name: 'Actual',
            data: Array.from(this.ipdoStats, ((e: any) => parseFloat(e.actual)))
          }

          console.log(arrayObjOfBaseline,arrayObjOfTarget,arrayObjOfActual,'jujuju')

          this.initStateStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
          this.spinner.hide();

      },
      (error) => {

      }
    )
  }
  getCrossCuttingStats() {
    this.spinner.show()
    if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
      this.state_id = undefined
    }
    this.crud.getAuthData(`analytics/indicators?${(this.state_id) ? 'state_id=' + this.state_id : ''}`).subscribe(
      (res: any) => {
        // this.pdoStats = res?.payload;
        // console.log(this.pdoStats);
        // const arrayOfPDOs = Array.from(this.pdoStats, ((e: any) => e.title))
        // const arrayObjOfBaseline = {
        //   name: 'Baseline',
        //   data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.baseline)))
        // }
        // const arrayObjOfTarget = {
        //   name: 'Target',
        //   data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.target)))
        // }
        // const arrayObjOfActual = {
        //   name: 'Actual',
        //   data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.actual)))
        // }

        // this.initStackBudget(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget])
        // this.spinner.hide();
        //this.pdoStats = res?.payload;
        //console.log(this.pdoStats);
        const arrayOfPDOs = [
          'GREVIANCE REDRESS MECHANISM',
          'VOLUNTARY LAND DONATON',
          'GENDER BASED VIOLENCE',
          'FRAUD AND CORRUPTION',
          'SOCIAL SAFEGUARD ISSUES (SEA,SH cases etc.)',
          'ENVIRONMENTAL  SAFEGUARD ISSUES'
        ]
        const arrayObjOfBaseline = {
          name: 'Reported',
          data: [0,0,0,0,0,0]
        }
        const arrayObjOfBaseline1 = {
          name: 'Investigated',
          data: [0,0,0,0,0,0]
        }
        const arrayObjOfBaseline2 = {
          name: 'Uninvestigated',
          data: [0,0,0,0,0,0]
        }
        const arrayObjOfBaseline3 = {
          name: 'Resolved',
          data: [0,0,0,0,0,0]
        }
        const arrayObjOfBaseline4 = {
          name: 'Unresolved',
          data: [0,0,0,0,0,0]
        }

        this.initCrossCuttingGraph(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfBaseline1, arrayObjOfBaseline2, arrayObjOfBaseline3, arrayObjOfBaseline4])
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )
  }
  submit() {

    // if (this.form.invalid) {

    //   return
    // }
    if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
      this.spinner.show();
    this.crud.postCCAuthData('cissueslistgraphstate', this.form.value, sessionStorage.getItem('user')).subscribe(
      (res: any) => {

        this.pdoStats = res?.payload;
        const arrayOfPDOs = Array.from(this.pdoStats, ((e: any) => e.title))
        const arrayObjOfBaseline = {
          name: 'Reported',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.reported)))
        }
        const arrayObjOfTarget = {
          name: 'Investigated',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.investigated)))
        }
        const arrayObjOfActual = {
          name: 'Uninvestigated',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.univestigated)))
        }
        const arrayObjOfTargett = {
          name: 'Resolved',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.resolved)))
        }
        const arrayObjOfActualt = {
          name: 'Unresolved',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.unresolved)))
        }
        this.initCrossCuttingGraph(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget, arrayObjOfTargett, arrayObjOfActualt])
        this.spinner.hide();

      },
      (error) => {

      }
    )
    }else{

      this.spinner.show();
    this.crud.postCCAuthData('cissueslistgraph', this.form.value, sessionStorage.getItem('user')).subscribe(
      (res: any) => {

        this.pdoStats = res?.payload;
        const arrayOfPDOs = Array.from(this.pdoStats, ((e: any) => e.title))
        const arrayObjOfBaseline = {
          name: 'Reported',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.reported)))
        }
        const arrayObjOfTarget = {
          name: 'Investigated',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.investigated)))
        }
        const arrayObjOfActual = {
          name: 'Uninvestigated',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.univestigated)))
        }
        const arrayObjOfTargett = {
          name: 'Resolved',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.resolved)))
        }
        const arrayObjOfActualt = {
          name: 'Unresolved',
          data: Array.from(this.pdoStats, ((e: any) => parseFloat(e.unresolved)))
        }
        this.initCrossCuttingGraph(arrayOfPDOs, [arrayObjOfBaseline, arrayObjOfActual, arrayObjOfTarget, arrayObjOfTargett, arrayObjOfActualt])
        this.spinner.hide();

      },
      (error) => {

      }
    )

    }
    
  }
  initIStackBudget(categories, series) {
    this.ioiChartsOptions = {
      colors: ['#436ab5cc', '#FEBD7A', '#eb5757b3'],
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        floating: true,
      },
      xAxis: {
        categories,
        title: {
          text: null
        },
        scrollbar: {
          enabled: true
        },
      },
      yAxis: {
        min: 0, title: {
          text: 'Population (millions)', align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      // tooltip : {
      //   valueSuffix: ' millions'
      // },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          },
          pointPadding: 0,
          groupPadding: 0.2,
          padding: 0,
        }
      },
      credits: {
        enabled: false
      },
      series
    }

  }
  initStackBudget(categories, series) {
    this.pdoChartsOptions = {
      colors: ['#436ab5cc', '#FEBD7A', '#eb5757b3'],
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        floating: true,
      },
      xAxis: {
        categories,
        title: {
          text: null
        },
        scrollbar: {
          enabled: true
        },
      },
      yAxis: {
        min: 0, title: {
          text: 'Population (millions)', align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      // tooltip : {
      //   valueSuffix: ' millions'
      // },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          },
          pointPadding: 0,
          groupPadding: 0.2,
          padding: 0,
        }
      },
      credits: {
        enabled: false
      },
      series
    }

  }
  initStateStackBudget(categories, series) {
    this.pdoStateChartsOptions = {
      colors: ['#436ab5cc', '#FEBD7A', '#eb5757b3'],
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        floating: true,
      },
      xAxis: {
        categories,
        title: {
          text: null
        },
        scrollbar: {
          enabled: true
        },
      },
      yAxis: {
        min: 0, title: {
          text: 'Population (millions)', align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      // tooltip : {
      //   valueSuffix: ' millions'
      // },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          },
          pointPadding: 0,
          groupPadding: 0.2,
          padding: 0,
        }
      },
      credits: {
        enabled: false
      },
      series
    }

  }

  initCrossCuttingGraph(categories, series) {
    this.crossCuttingOptions = {
      colors: ['#436ab5cc', '#FEBD7A', '#eb5757b3', '#FEBD7A', '#eb5757b3'],
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        floating: true,
      },
      xAxis: {
        categories,
        title: {
          text: null
        },
        scrollbar: {
          enabled: true
        },
      },
      yAxis: {
        min: 0, title: {
          text: 'Count', align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      // tooltip : {
      //   valueSuffix: ' millions'
      // },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          },
          pointPadding: 0,
          groupPadding: 0.2,
          padding: 0,
        }
      },
      credits: {
        enabled: false
      },
      series
    }

  }


  getOutputStats() {
    this.spinner.show();
    this.crud.getAuthData('analytics/outputs').subscribe((res: any) => {
      this.outputStats = res.payload;
      this.spinner.hide();
    },
      (err) => {
        this.spinner.hide();
      }
    )
  }

  getStates() {
    this.crud.getCCAuthData('nigerianstates/enabled').subscribe((res: any) => {
      this.states = res.payload;
      this.getAllStats()
    })
  }
  getIOIStats(){
    this.getIPDOStats();
  }
  getAllStats() {

    this.getProjectStats();
    this.getTopProjects();
    this.getOutputStats()
    // this.getPDOStats();
    // this.getPDOStatesStats();
    // this.getIPDOStats();
    // this.getCrossCuttingStats();
  }
  getSubComponents() {
    this.crud.getAuthData('sub-components').subscribe((res: any) => this.subComponents = res.payload)
  }

  toPercent(top: any, div: any) {
    return Number(((top / div) * 100).toFixed());
  }

  getProjectStats() {
    this.spinner.show();
    if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
      this.state_id = undefined
    }
    this.crud.getAuthData(`analytics/projects?${(this.state_id) ? 'state_id=' + this.state_id : ''}${(this.sub_component_id) ? '&sub_component_id=' + this.sub_component_id : ''}`).subscribe(
      (res: any) => {
        this.stats = res?.payload;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )
  }

  getTopProjects() {
    this.spinner.show();
    if (this.currentUserObj.roles[0].name == 'lga' || this.currentUserObj.roles[0].name == 'state') {
      this.state_id = undefined
    }
    this.crud.getAuthData(`analytics/top-projects?${(this.state_id) ? 'state_id=' + this.state_id : ''}${(this.sub_component_id) ? '&sub_component_id=' + this.sub_component_id : ''}`).subscribe(
      (res: any) => {
        this.projects = res?.payload;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )
  }


  // initBudgetChart(){
  //   const data = {
  //     labels: ["Total Released", "Total Utilized"],
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [2, 5],
  //       backgroundColor: [
  //         '#19C45F',
  //         '#96CCAC'
  //       ],
  //       hoverOffset: 4
  //     }]
  //   };
  //   const config = {
  //     type: 'doughnut',
  //     data: data,
  //   };
  //   this.canvas = document.getElementById("chartbudget");
  //   this.ctx = this.canvas.getContext("2d");

  //   new Chart(this.ctx, {
  //     type: 'doughnut',
  //     data: data,
  //     options: {
  //       plugins: {
  //           legend: {
  //               display: false,
  //               labels: {
  //                   color: 'rgb(255, 99, 132)'
  //               }
  //           }
  //       }
  //   }
  //   });
  // }
  getIndicators(){
    this.crud.getCCAuthData('pdoindicator').subscribe((res: any) => {
      this.pdos = res.payload;
      //this.getAllStats()
    })
  }
  getSIndicators(){
    this.crud.getCCAuthData('subpdoindicator').subscribe((res: any) => {
      this.subpdos = res.payload;
      //this.getAllStats()
    })
  }
}
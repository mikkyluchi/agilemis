import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivityService} from '../../../services/activity.service';
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';

declare const Chart: any;
declare const $: any;

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  id: string;
  lineChart: any;
  logframes: any;
  project: any;
  comments: any;
  photos: any = [];
  constructor(
    private route: ActivatedRoute,
    private activity_service: ActivityService,
    private crud: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    // this.initiateLineChart();
    this.imgFunc();
    this.pullProjectDetails();
    // this.pullProjectLogs();
  }

  pullProjectDetails() {
    this.spinner.show();
    this.crud.getAuthData(`projects/${this.id}`).subscribe((res: any) => {
      this.project = res.payload;
      this.project?.reports.forEach(e => this.photos.push(...e?.pictures))
      this.spinner.hide();
    },
    (error) => {
      this.spinner.hide();
    });
  }

  pullProjectLogs() {
    this.activity_service.getProjectLogframes(this.id).subscribe((res: any) => {
      this.project = res.data.data;
    },
    (error) => {
    });
  }

  initiateLineChart() {
    // initiateLineChart(data, labels) {
    Chart.defaults.global.defaultFontColor = '#D9E7C8';

    const canva = <HTMLCanvasElement>document.getElementById('myLineChart');
    const ctx = canva.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 165, 188,.3)');
    gradient.addColorStop(1, 'rgba(0, 165, 188,0)');

    this.lineChart = new Chart('myLineChart', {
      type: 'line',
      data: {
        labels: ['QRT 1', 'QRT 2', 'QRT 3', 'QRT 4'], // your labels array
        datasets: [
          {
            label: 'Released',
            borderColor: '#D9E7C8',
            borderWidth: 2,
            // backgroundColor: gradient,
            data: [243000000, 176000000, 300000000, 423000000],
          },
          {
            label: 'Utilized',
            borderColor: '#F39200',
            borderWidth: 2,
            // backgroundColor: gradient,
            data: [198000000, 206000000, 320000000, 400000000],
          },
        ],
      },
      options: {
        // onClick:this.initiateChartInterativity.bind(this),
        responsive: true,
        scaleFontColor: '#FFFFFF',
        legend: {
          display: true,
          labels: {
            fontColor: '#D9E7C8',
          },
        },
        scales: {
          xAxes: [
            {
              display: true,
              barPercentage: 0.9,
              categoryPercentage: 0.5,
              gridLines: {
                color: '#D9E7C8',
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                color: '#FFFFFF00',
              },
            },
          ],
        },
      },
    });
  }

  imgFunc() {
    $('.portfolio-menu ul li').click(function () {
      $('.portfolio-menu ul li').removeClass('active');
      $(this).addClass('active');

      var selector = $(this).attr('data-filter');
      $('.portfolio-item').isotope({
        filter: selector,
      });
      return false;
    });
    $(document).ready(function () {
      var popup_btn = $('.popup-btn');
      popup_btn.magnificPopup({
        type: 'image',
        gallery: {
          enabled: true,
        },
      });
    });
  }

  setPosition(loc) {
    loc = 50;
    if (loc > 11) {
      return loc;
    }

    return 0;
  }}

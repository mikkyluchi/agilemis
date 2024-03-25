import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {
  deliverableId: any;
  projects: any = [];
  p: any
  role: any;
  pageSize: any = 10
  constructor(private router: Router) {
    this.role = JSON.parse(localStorage.getItem('role'));

  }

  ngOnInit(): void {
    this.pullProject()
  }
  pullProject() {
  }
  
  openProjectReports(item) {
    this.router.navigate(['/home/project/project-report-log'], {
      state: {
        log: JSON.stringify(item)
      }
    })

  }
}

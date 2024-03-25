import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-sp',
  templateUrl: './sp.component.html',
  styleUrls: ['./sp.component.scss']
})
export class SpComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  activeYear: string;

  constructor() {
    this.activeYear = localStorage.getItem('activeYear')
    // if (this.activeYear == '2020')
    //   this.staticTabs.tabs[1].active = true;
    // else if (this.activeYear == '2021')
    //   this.staticTabs.tabs[0].active = true;
    // else {
    //   this.staticTabs.tabs[0].active = true;

    // }
  }

  ngOnInit(): void {
  }
  onSelect(ev) {
    console.log(ev);

  }
}

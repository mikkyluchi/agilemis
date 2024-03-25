import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/services/crud.service';
declare const $: any;

@Component({
  selector: 'third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.scss']
})
export class ThirdPartyComponent implements OnInit {
  searchRoleIcon: boolean;
  searchUserIcon: boolean;
  query: string;
  page;
  projects
  users = ['James', 'Benita', 'Cynthia', 'Sam', 'Musa']
  activeTab: string = 'c1';
  user_id: any;
  thirdParties: any;

  constructor(private crud: CrudService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getThirdParty();
  }

  getUsers(tab, filter){
    this.activeTab = tab;
  }

  getThirdParty(){
    this.crud.getAuthData(`third-parties?perPage=1`).subscribe(
      (res: any) => {
        this.thirdParties = res?.payload?.data;
      }
    )
  }
  showRoleIcon() {
    this.searchRoleIcon = true;
    this.searchUserIcon = false;
    this.query = "";
  }

  showUserIcon() {
    this.query = "";
    this.searchUserIcon = true;
    this.searchRoleIcon = false;
  }
  disableEmail() {

  }

  getUserByPage(data){}


  // async sortByOutputs(id){
  //   if (id == this.user_id && this.projects) {
  //     return
  //   }
  //   this.user_id = id;
  //   this.getProjectsByOutputs();
  // }

  // pull list of logframes for calendar year
  // getProjectsByOutputs(){
  //   return
  //   this.spinner.show()
  //   this.crud.getAuthData(`third_party/${this.user_id}/projects`).subscribe(
  //     (res: any) => {
  //       this.projects = res?.payload
  //       this.spinner.hide()
  //     },
  //     (error) => {
  //       this.spinner.hide()
  //       this.toastr.error(error.error.payload)
  //     }
  //   )
  // }
}

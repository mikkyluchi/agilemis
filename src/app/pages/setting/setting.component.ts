import { Component, OnInit } from "@angular/core";
declare var $: any;
import { SettingsService } from "../../services/settings/settings.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { data } from "jquery";
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
import { NgxSpinnerService } from "ngx-spinner";
import { CrudService } from "src/app/shared/services/crud.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { CreateUserComponent } from "../modal/user/create-user/create-user.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { YearaddComponent } from "../yearadd/yearadd.component";
import { QuarteraddComponent } from "../quarteradd/quarteradd.component";

@Component({
  selector: "setting-cmp",
  moduleId: module.id,
  templateUrl: "setting.component.html",
  styleUrls: ["./setting.component.css"],
})
export class SettingComponent implements OnInit {
  searchForm: FormGroup;
  btnText = "Submit";
  itemsPerPage: any;
  page: any;
  searchUserIcon = true;
  searchRoleIcon = false;
  totalItems: any = 23;
  itemsPerPage1: any;
  page1: any;
  totalItems1: any;
  query: any;
  userMail;
  disable;
  delVal;
  roleval;
  Idvalue;
  currentYear = [2022, 2021, 2020, 2019];
  quarters = ['1st', '2nd', '3rd', '4th'];
  activeYear;
  title = "Create User";
  roleTitle = "Create New Role";
  PermissionList = [];
  selectedItems = [];
  userForm: FormGroup;
  mdaForm: FormGroup;
  roleForm: FormGroup;
  loginSet: FormGroup;
  requestLogForm: FormGroup;

  popoverTitle = "Popover title";

  popoverMessage = "Popover description";
  confirmClicked = false;
  cancelClicked = false;
  public tableData1: TableData;
  public tableData2: TableData;
  currentUserObj;
  alluserdata;
  allroles;
  mdasList;
  states: any;
  lgas: any;
  userMetaData: any;
  years:any;
  quarterss:any;
  nigerianstates:any;
  projectIdd:any;
  projectId:any;
  statestatus = 0;
  constructor(
    private settings: SettingsService,
    private crud: CrudService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    public modalService: NgbModal
  ) {}
  ngOnInit() {
    this.initForms();
    this.setUserSettings();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user.roles[0]?.name == 'admin') {
      this.getUsers();
    }
    this.getRoles();
    this.getStates();
    this.getQuarters();
    this.getYears();
    this.getNigerianStates();
  }

  initForms(){
    // LoginSetting form
    this.loginSet = this.fb.group({
      name: ["", Validators.required],
      email: [""],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rePassword: ["", [Validators.required, Validators.minLength(6)]],
    });
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
  }
  
  getStates(){
    this.crud.getAuthData('states?lgas').subscribe((res: any) => this.states = res.payload)
  }

  setLgas(data){
    this.lgas = this.states.filter(e => e.id == (data?.target?.value || data))[0].lgas;
  }

  setUserSettings() {
    this.currentUserObj = JSON.parse(sessionStorage.getItem("user"));

    this.loginSet.patchValue({
      name: this.currentUserObj.name,
      email: this.currentUserObj.email,
      password: "",
    });

    setTimeout(() => {
      $("#user-nav-tabs li").on("click", function (e) {
        const targetLink = $(e.currentTarget.children[0]).attr("class").slice(1);
        const content_map = {
          c1: "#content1",
          c2: "#content2",
          c3: "#content3",
          c4: "#content4",
          c5: "#content5",
          c6: "#content6",
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

  resetUserForm() {
    this.userForm.reset();
    this.btnText = "Submit";
    this.title = "Create User";
    this.userForm.controls["email"].enable();
  }
  disableEmail() {
    this.loginSet.controls["email"].disable();
    this.loginSet.controls["name"].disable();
  }
  // Login Setting
  loginSetting() {
    const dataObj = this.loginSet.value;
    dataObj.password = this.loginSet.value.password;
    this.crud.patchAuthData(`auth/update`, dataObj).subscribe((res: any) => {
      this.toastr.success(res.payload);
    });
  }
  // Users
  getUsers() {
    this.spinner.show();
    this.crud.getAuthData('users').subscribe(
      (res: any) => {
        this.alluserdata = res.payload.data;
        this.userMetaData = res?.payload
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
      );
  }

  getQuarters() {
    this.spinner.show();
    this.crud.getCCAuthData('quarters').subscribe(
      (res: any) => {
        this.quarterss = res.payload
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
  getNigerianStates() {
    this.spinner.show();
    this.crud.getCCAuthData('nigerianstates').subscribe(
      (res: any) => {
        this.nigerianstates = res.payload
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
      );
  }

  paginate(e){
    this.spinner.show();
    this.crud.getAuthData(`users?page=${e.page+1}`).subscribe(
      (res: any)=>{
        this.alluserdata = res?.payload?.data;
        this.spinner.hide();
        this.userMetaData = res?.payload
      }, error => this.spinner.hide()
    )
  }

  getUserByPage(page: any) {
    this.settings.getUserByPage(page).subscribe((res: any) => {
      this.alluserdata = res.data.data;
      this.itemsPerPage = res.data.per_page;
      this.page = res.data.current_page;
      this.totalItems = res.data.total;
      // this.totalItems = this.getProjectDataMDA.total ;
    });
  }
  searchUser() {
    this.spinner.show();
    this.crud.getAuthData('users?query='+this.query).subscribe(
      (res: any) => {
        this.alluserdata = res.payload.data;
        this.userMetaData = res?.payload
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
      );
  }

  // saveDelval
  saveDelVal(id: any) {
    this.delVal = id;
  }

  //  Delete Users
  delUser() {
    this.crud.deleteAuthData(`users/${this.delVal}`).subscribe((res: any) => {
      this.getUsers();
      this.toastr.success('Deleted');
      $("#deluserModal").modal("hide");
    },
    (error) => {
      this.toastr.warning('Failed to delete user')
    }
    );
  }
  enableState() {
    if(this.statestatus === 0){
      this.crud.deleteCCAuthData('disablestate', this.projectId).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          document.getElementById('closeDelProjectModal').click();
        },
        (err) => {
          this.toastr.error(err.message)
        });
    }
    if(this.statestatus === 1){
      this.crud.deleteCCAuthData('enablestate', this.projectId).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          document.getElementById('closeDelProjectModal').click();
        },
        (err) => {
          this.toastr.error(err.message)
        });
    }
  }
  // Create Roles

  getRoles() {
    this.crud.getAuthData('roles').subscribe(
      (res: any) => {
        this.allroles = res.payload;
      },
      (error) => {
        console.log(error);
      }
    );
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

  openUserModal(data) {
    const initialState = {
      states: this.states,
      allroles: this.allroles,
      data
    }
    const modalRef = this.bsModalService.show(CreateUserComponent, { class: 'modal-xl', initialState });
    modalRef.content.onClose.subscribe(result => {
      this.getUsers();
    })
  }
  openYearModal(){
    const modalRef = this.modalService.open(YearaddComponent);
    //modalRef.componentInstance.src = item;
  }
  openQuarterModal(){
    const modalRef = this.modalService.open(QuarteraddComponent);
    //modalRef.componentInstance.src = item;
  }
  delUserrr() {
     
    this.crud.deleteCCAuthData('yeardelete', this.projectIdd).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        document.getElementById('closeDelProjectModal').click();
      },
      (err) => {
        this.toastr.error(err.message)
      });
  }
  delUserr() {
     
    this.crud.deleteCCAuthData('quarterdelete', this.projectId).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        document.getElementById('closeDelProjectModal').click();
      },
      (err) => {
        this.toastr.error(err.message)
      });
  }
}

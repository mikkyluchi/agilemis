import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  btnText = "Submit";
  title = "Create User";
  Idvalue;
  userMail;
  states: any;
  lgas: any;
  allroles;
  onClose: any;
  data: any;

  constructor(private fb: FormBuilder, private crud: CrudService, private toastr: ToastrService, public activeModal: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.initForms();
  }

  initForms(){
    //  User form
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      password: ["", Validators.required],
      phone_number: ["", Validators.required],
      lga_id: ["", Validators.required],
    });

    if (this.data) {
      this.editUser(this.data)
    }
  }

  // Create User && Update user's function
  createUser() {
    if (this.userForm.valid) {
      if (!this.Idvalue) {
        this.crud.postAuthData('users', this.userForm.value).subscribe(
          (res: any) => {
            this.toastr.success(res.payload);
            this.activeModal.hide()
            this.onClose.next(false);
          },
          (error) => {
            this.toastr.error("something went wrong");
          }
        );
        this.userForm.reset();
      } else {
        this.userForm.value.email = this.userMail
        this.crud.patchAuthData(`users/${this.Idvalue}`, this.userForm.value).subscribe(
          (res: any) => {
            this.toastr.success(res.payload);
            this.activeModal.hide()
            this.onClose.next(false);
          },
          (error) => {
            this.toastr.error("something went wrong");
          }
        );
      }
    }
  }

  // Edit users
  editUser(item: any) {
    this.btnText = "Update";
    this.title = "Update User";
    this.Idvalue = item.id;
    this.userMail = item.email;
    this.userForm.controls["email"].disable();
    // this.userForm.controls["password"].disable();
    this.setLgas(item.lga.state_id);
    this.userForm.patchValue(item);
    this.userForm.patchValue({
      role: item?.roles[0].name
    })

  }

  setLgas(data){
    this.lgas = this.states.filter(e => e.id == (data?.target?.value || data))[0].lgas;
  }

  resetUserForm() {
    this.userForm.reset();
    this.btnText = "Submit";
    this.title = "Create User";
    this.userForm.controls["email"].enable();
  }
}

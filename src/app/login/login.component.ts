import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'
declare var $: any;
import {NgxSpinnerService} from 'ngx-spinner';
import { CrudService } from '../shared/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputType = "text";
  constructor(private crud: CrudService,private router: Router, private auth: AuthService, public spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
  }

  // Login
  onLogin(data) {
    
    this.spinner.show();
    this.auth.login(data).subscribe(
      (res:any)=>{ 
        if (res.status === true){
          //this.spinner.hide();
          this.crud.postCCAuthData('user/getUserState', {user: res.payload.id}, JSON.stringify(res.payload.user)).subscribe(
            (ress: any) => {
              this.spinner.hide();
              sessionStorage.setItem('token',res.payload.token)
              sessionStorage.setItem('state_id',ress.state_id)
              sessionStorage.setItem('user',JSON.stringify(res.payload.user))
              this.router.navigate(['/analytics']);
              
            },
            (error)=>{
               
            }
          )
          
          
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
  }
  // end

  // Checking Login Status
  loggedIn(){
    return !!sessionStorage.getItem('token')
  }
  // end

  changeType(data){
    this.inputType = data;
    if (this.inputType == "text") {
      $('#password').attr('type', 'password');
    }else{
      $('#password').attr('type', 'text');
    }
  }

}

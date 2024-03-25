import { Injectable } from '@angular/core';
import  {environment} from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) {}

  login(data){
    return this.http.post(environment.apiBaseUrl + 'login', data);
  }
}








// @Directive()
// @Injectable({
//   providedIn: 'root'
// })
// export class HomeService {


//   noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

//   constructor(private http: HttpClient, private sanitizer: DomSanitizer, private ativatedroute: ActivatedRoute) { }

//   getHome() {
//     console.log(environment.apiBaseUrl + 'home-settings')
//     return this.http.get(environment.apiBaseUrl + 'home-settings');
//   }
//   updateHome(data) {
//     return this.http.put(environment.apiBaseUrl + 'home-settings', data);
//   }

// }

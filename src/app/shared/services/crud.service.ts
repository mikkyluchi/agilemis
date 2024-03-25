import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  header = {
    headers: new HttpHeaders().set(
      "Authorization",
      `Bearer ${sessionStorage.getItem("token")}`
    ),
  };
  
  constructor(private http: HttpClient) {}
  refreshdata: EventEmitter<any> = new EventEmitter();
  getInternalData(url){
    return this.http.get(url);
  }

  getAuthData(endpoint){
    return this.http.get(environment.apiBaseUrl + endpoint, this.header);
  }
  getCCAuthData(endpoint){
    return this.http.get(environment.ccapiBaseUrl + endpoint);
  }
  postAuthData(endpoint, data){
    return this.http.post(environment.apiBaseUrl + endpoint, data, this.header);
  }
  postCCCAuthData(endpoint, data){
    return this.http.post(environment.ccapiBaseUrl + endpoint, data);
  }
  postCCCCAuthData(endpoint, data, user){
    return this.http.post(environment.ccapiBaseUrl + endpoint, {data:data,user:JSON.parse(user).id});
  }
  postCCCCCAuthData(endpoint, data, user, role){
    return this.http.post(environment.ccapiBaseUrl + endpoint, {data:data,user:JSON.parse(user).id,role});
  }
  postCCAuthData(endpoint, data, user){
    return this.http.post(environment.ccapiBaseUrl + endpoint, {data:data,user:JSON.parse(user).id});
  }
  postCCAuthDatad(endpoint, data,primary_six,secondary_schools,number_of_grieviances, user){
    return this.http.post(environment.ccapiBaseUrl + endpoint, {number_of_grieviances:number_of_grieviances,data:data,primary_six:primary_six,secondary_schools:secondary_schools,user:JSON.parse(user).id});
  }
  
  deleteCCAuthData(endpoint, id){
    return this.http.post(environment.ccapiBaseUrl + endpoint, {id:id});
  }
  putCCAuthData(endpoint, data, id){
    return this.http.post(environment.ccapiBaseUrl + endpoint, {data:data,id:id});
  }
  postCCCAuthDataUpdate(endpoint, data, id){
    return this.http.post(environment.ccapiBaseUrl + endpoint, {data:data,id:id});
  }
  putAuthData(endpoint, data){
    return this.http.put(environment.apiBaseUrl + endpoint, data, this.header);
  }

  patchAuthData(endpoint, data){
    return this.http.patch(environment.apiBaseUrl + endpoint, data, this.header);
  }
  ccpatchAuthData(endpoint, data){
    return this.http.post(environment.ccapiBaseUrl + endpoint, data);
  }

  deleteAuthData(endpoint){
    return this.http.delete(environment.apiBaseUrl + endpoint, this.header);
  }
}

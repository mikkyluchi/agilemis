import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ContractsService {
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${sessionStorage.getItem('token')}`)
  }
  constructor(private http: HttpClient) { }

  createProjects(data) {
    return this.http.post(environment.apiBaseUrl + 'projects', data, this.header);
  }
  
  createBulkProjects(data) {
    return this.http.post(environment.apiBaseUrl + 'projects/bulk', data, this.header);
  }

  createContracts(data) {
    return this.http.post(
      environment.apiBaseUrl + "createContract",
      data,
      this.header
    );
  }
  getContracts() {
    return this.http.get(environment.apiBaseUrl + "getContracts", this.header);
  }
  editContracts(data) {
    return this.http.post(
      environment.apiBaseUrl + "editContract",
      data,
      this.header
    );
  }
  deleteContracts(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteContract?id=" + data,
      this.header
    );
  }

  getContractors() {
    return this.http.get(
      environment.apiBaseUrl + "getContractors",
      this.header
    );
  }
  createContractors(data) {
    return this.http.post(
      environment.apiBaseUrl + "createContractor",
      data,
      this.header
    );
  }
  editContractors(data) {
    return this.http.post(
      environment.apiBaseUrl + "editContractor",
      data,
      this.header
    );
  }
  deleteContractors(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteContractor?id=" + data,
      this.header
    );
  }

  searchContractors(searchKeyword) {
    debugger;
    return this.http.get(
      environment.apiBaseUrl + "searchContractor?search=" + searchKeyword,
      this.header
    );
  }

  searchContracts(searchKeyword) {
    debugger;
    return this.http.get(
      environment.apiBaseUrl + "searchContract?search=" + searchKeyword,
      this.header
    );
  }
  getOutputByMdaID(data) {
    return this.http.get(
      environment.apiBaseUrl + "getOutputByMdaId?mda_id=" + data,
      this.header
    );
  }
}

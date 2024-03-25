import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MandateService {
  authHeader = {
    headers: new HttpHeaders({ BearerToken: sessionStorage.getItem("token") }),
  };

  header = {
    headers: new HttpHeaders().set(
      "Authorization",
      `Bearer ${sessionStorage.getItem("token")}`
    ),
  };

  constructor(private http: HttpClient) {}

  getMandates() {
    return this.http.get(environment.apiBaseUrl + "getMandates", this.header);
  }
  searchMandate(keyword) {
    return this.http.get(
      environment.apiBaseUrl + "getMandates?search=" + keyword,
      this.header
    );
  }

  getMandatesByPage(page) {
    return this.http.get(
      environment.apiBaseUrl + "getMandates?page=" + page,
      this.header
    );
  }
  createMandate(data) {
    return this.http.post(
      environment.apiBaseUrl + "createMandate",
      data,
      this.header
    );
  }
  editMandate(data) {
    return this.http.post(
      environment.apiBaseUrl + "editMandate",
      data,
      this.header
    );
  }

  deleteMandateById(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteMandateById?id=" + data,
      this.header
    );
  }

  createSubInitiative(data) {
    return this.http.post(
      environment.apiBaseUrl + "createSubinitiative",
      data,
      this.header
    );
  }
  editSubInitiatives(data) {
    return this.http.post(
      environment.apiBaseUrl + "editSubinitiative",
      data,
      this.header
    );
  }
  getInitiatives() {
    return this.http.get(
      environment.apiBaseUrl + "getSubinitiatives",
      this.header
    );
  }
  searchInitiatives(keyword) {
    return this.http.get(
      environment.apiBaseUrl + "getSubinitiatives?search=" + keyword,
      this.header
    );
  }

  getInitiativeByPage(page) {
    return this.http.get(
      environment.apiBaseUrl + "getSubinitiatives?page=" + page,
      this.header
    );
  }
  delInitiative(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteSubinitiativeById?id=" + data,
      this.header
    );
  }

  getSIById(id) {
    return this.http.get(
      environment.apiBaseUrl + "getSubinitiativeByMandateId?mandate_id=" + id,
      this.header
    );
  }

  getMandateByMdaID(data) {
    return this.http.get(environment.apiBaseUrl + 'getMandateByMda?mda_id=' + data, this.header);
  }


}

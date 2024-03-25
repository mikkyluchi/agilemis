import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { share } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FiscalService {
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${sessionStorage.getItem('token')}`)
  }
  constructor(private http: HttpClient) { }

  getBudgetByYear(data) {
    return this.http.get(
      environment.apiBaseUrl + "getBudgetByYear?year=" + data,
      this.header
    );
  }

  getBudgetByMdasYear(data) {
    return this.http.get(`${environment.apiBaseUrl}getBudgetByMdasYear?year=${data.year}&mda_id=${data.mda_id}`, this.header);
  }
  
  searchBudget(keyword) {
    return this.http.get(
      environment.apiBaseUrl + "getBudgetByYear?search=" + keyword,
      this.header
    );
  }
  createBudget(data) {
    return this.http.post(
      environment.apiBaseUrl + "createBudget",
      data,
      this.header
    );
  }
  updateBudget(data) {
    return this.http.post(
      environment.apiBaseUrl + "editBudget",
      data,
      this.header
    );
  }
  deleteBudget(data) {
    return this.http
      .delete(
        environment.apiBaseUrl + "deleteBudgetById?id=" + data,
        this.header
      )
      .pipe(share());
  }
  deleteBudgetByYear(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteBudgetByYear?year=" + data,
      this.header
    );
  }

  deleteBudgetByMdas(data) {
    return this.http.delete(
      environment.apiBaseUrl +
        "deleteBudgetByMdasYear?mda_id=" +
        data.mda_id +
        "&year=" +
        data.year,
      this.header
    );
  }

  deleteReleaseByMdas(data) {
    return this.http.delete(
      environment.apiBaseUrl +
        "deleteReleaseByMdasYear?year=" +
        data.year +
        "&mda_id=" +
        data.mda_id,
      this.header
    );
  }

  deleteReleaseByYear(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteReleaseByYear?year=" + data,
      this.header
    );
  }

  createRelease(data) {
    return this.http.post(
      environment.apiBaseUrl + "createRelease",
      data,
      this.header
    );
  }
  getReleaseByQuarter(data) {
    return this.http.get(`${environment.apiBaseUrl}releases?quarter=${data.quarter}&year=${data.year}`, this.header);
  }

  searchRelease(keyword) {
    return this.http.get(
      environment.apiBaseUrl + "getReleaseByQuarter?search=" + keyword,
      this.header
    );
  }
}

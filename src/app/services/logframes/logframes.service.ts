import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { share } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LogframesService {
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${sessionStorage.getItem('token')}`)
  }
  constructor(private http: HttpClient) { }

  getLogframes(endpoint) {
    return this.http.get(
      environment.apiBaseUrl + endpoint,
      this.header
    );
  }

  postData(endpoint, data) {
    return this.http.post(
      environment.apiBaseUrl + endpoint,
      data,
      this.header
    );
  }

  updateData(endpoint, data) {
    return this.http.patch(
      environment.apiBaseUrl + endpoint,
      data,
      this.header
    );
  }

  deleteLogframe(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteBudgetByYear?year=" + data,
      this.header
    );
  }
}

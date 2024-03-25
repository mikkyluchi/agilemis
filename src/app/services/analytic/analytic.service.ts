import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class AnalyticService {
  header = {
    headers: new HttpHeaders().set(
      "Authorization",
      `Bearer ${sessionStorage.getItem("token")}`
    ),
  };
  constructor(private http: HttpClient) {}

  getAnalytics(endpoint: string) {
    return this.http.get(environment.apiBaseUrl + endpoint, this.header);
  }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${sessionStorage.getItem('token')}`)
  }
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(environment.apiBaseUrl + "getProjects", this.header);
  }
  searchProject(keyword) {
    return this.http.get(
      environment.apiBaseUrl + "getProjects?search=" + keyword,
      this.header
    );
  }
  getProjectbyPage(page) {
    {
      return this.http.get(
        environment.apiBaseUrl + "getProjects?page=" + page,
        this.header
      );
    }
  }
  getProjectByMdaId(data) {
    return this.http.get(
      environment.apiBaseUrl + "getProjectByMdaId?mda_id=" + data,
      this.header
    );
  }

  getProjectById(data) {
    return this.http.get(environment.apiBaseUrl + 'projects/' + data, this.header);
  }

  getProjectLogframes(data) {
    return this.http.get(environment.apiBaseUrl + 'projects/' + data, this.header);
  }

  editProject(data){
    return this.http.post(environment.apiBaseUrl + 'editProject', data, this.header);
  }
  deleteProjectByProjectBatch(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteProjectByProjecBatch?batch=" + data,
      this.header
    );
  }
  deleteProjectById(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteProjectById?id=" + data,
      this.header
    );
  }

  createOutput(data) {
    return this.http.post(
      environment.apiBaseUrl + "createOutput",
      data,
      this.header
    );
  }
  getSiByMandateId(data) {
    return this.http.get(
      environment.apiBaseUrl + "getSubinitiativeByMandateId?mandate_id=" + data,
      this.header
    );
  }
  uploadPhotoGallery(data) {
    return this.http.post(
      environment.apiBaseUrl + "uploadProjectPhotoGallary",
      data,
      this.header
    );
  }

  assignProjectDelieverableSi(data) {
    return this.http.post(
      environment.apiBaseUrl + "assignProjectDelieverableSi",
      data,
      this.header
    );
  }
  getProjectReport(id) {
    return this.http.get(
      environment.apiBaseUrl + "getProjectReport?id=" + id,
      this.header
    );
  }
}

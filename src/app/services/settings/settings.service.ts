import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class SettingsService {
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

  login(data) {
    console.log(data);
    console.log(environment.apiBaseUrl + "login");
    return this.http.post(environment.apiBaseUrl + "login", data);
  }

  getUsers() {
    return this.http.get(environment.apiBaseUrl + "getUsers", this.header);
  }
  searchUser(keyword) {
    return this.http.get(
      environment.apiBaseUrl + "getUsers?search=" + keyword,
      this.header
    );
  }

  getUserByPage(page) {
    return this.http.get(
      environment.apiBaseUrl + "getUsers?page=" + page,
      this.header
    );
  }
  createRoles(data) {
    return this.http.post(
      environment.apiBaseUrl + "createRole",
      data,
      this.header
    );
  }
  getRoles() {
    return this.http.get(environment.apiBaseUrl + "getRoles", this.header);
  }
  searchRole(keyword) {
    return this.http.get(
      environment.apiBaseUrl + "getRoles?search=" + keyword,
      this.header
    );
  }
  getRoleByPage(page) {
    return this.http.get(
      environment.apiBaseUrl + "getRoles?page=" + page,
      this.header
    );
  }
  editRoles(data) {
    return this.http.post(
      environment.apiBaseUrl + "editRole",
      data,
      this.header
    );
  }
  delRoles(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteRoleById?id=" + data,
      this.header
    );
  }
  createMdas(data) {
    return this.http.post(
      environment.apiBaseUrl + "createMda",
      data,
      this.header
    );
  }
  getMdas() {
    return this.http.get(environment.apiBaseUrl + "getMdas", this.header);
  }
  getStates() {
    return this.http.get(environment.apiBaseUrlv2 + 'states', this.header);
  }

  getLocals() {
    return this.http.get(environment.apiBaseUrlv2 + 'locals', this.header);
  }

  createUser(data) {
    return this.http.post(
      environment.apiBaseUrl + "createUser",
      data,
      this.header
    );
  }

  deleteUser(data) {
    return this.http.delete(
      environment.apiBaseUrl + "deleteUser?id=" + data,
      this.header
    );
  }

  updateUser(data) {
    return this.http.post(
      environment.apiBaseUrl + "editUser",
      data,
      this.header
    );
  }
  searchQuery(data) {
    return this.http.get(
      environment.apiBaseUrl + "getUserByNameOrEmail?keyword=" + data,
      this.header
    );
  }
  changePassword(data) {
    return this.http.post(
      environment.apiBaseUrl + "login/changePassword",
      data,
      this.header
    );
  }
  userSetActiveYear(data) {
    return this.http.post(
      environment.apiBaseUrl + "userSetActiveYear",
      data,
      this.header
    );
  }
}

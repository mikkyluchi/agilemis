import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoginComponent } from "./login/login.component";
// import { UserLayoutComponent } from "./layouts//user-layout/user-layout.component";
// import { UserSidebarComponent } from "./user-sidebar/user-sidebar.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from "@angular/common";
import { SbmcComponent } from './pages/sbmc/sbmc.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProjectcategoriesComponent } from './pages/projectcategories/projectcategories.component';
import { PcmodalComponent } from './pages/pcmodal/pcmodal.component';
import { AnalyticsdashboardonlyComponent } from './analyticsdashboardonly/analyticsdashboardonly.component';
import { OutputicommentsmodalComponent } from './pages/outputicommentsmodal/outputicommentsmodal.component';
import { PlanuploadmodalComponent } from './modal/planuploadmodal/planuploadmodal.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SbmcComponent,
    PrivacyPolicyComponent,
    AnalyticsdashboardonlyComponent,
    PlanuploadmodalComponent,
    
    // UserLayoutComponent,
    // UserSidebarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    // NavbarModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    // FooterModule,
    // FixedPluginModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

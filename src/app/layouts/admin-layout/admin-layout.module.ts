import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { SettingComponent } from '../../pages/setting/setting.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { DeliverableComponent } from '../../pages/deliverable/deliverable.component';
import { ActivityComponent } from '../../pages/activity/activity.component';
import { FiscalComponent } from '../../pages/fiscal/fiscal.component';
import { ContractComponent } from '../../pages/contract/contract.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
// import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import {ModalComponent} from '../../pages/modal/modal.component';
import {ViewProjectComponent} from '../../pages/activity/view-project/view-project.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {PaginatorModule} from 'primeng/paginator';


import { DeskOfficerComponent } from '../../pages/desk-officer/desk-officer.component';
import { SpotCheckComponent } from '../../pages/spot-check/spot-check.component';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';
import { ResultTreeComponent } from '../../pages/result-tree/result-tree.component';
import { CreateLeadingComponent } from '../../pages/result-tree/modals/leading/create-leading/create-leading.component';
import { EditLeadingComponent } from '../../pages/result-tree/modals/leading/edit-leading/edit-leading.component';
import { AssignDeliverableComponent } from '../../pages/result-tree/modals/mandates/assign-mandate/assign-mandate.component';
import { CreateMandateComponent } from '../../pages/result-tree/modals/mandates/create-mandate/create-mandate.component';
import { EditMandateComponent } from '../../pages/result-tree/modals/mandates/edit-mandate/edit-mandate.component';
import { MoveComponent } from '../../pages/result-tree/modals/move/move.component';
import { CreateOutcomesComponent } from '../../pages/result-tree/modals/outcomes/create-outcomes/create-outcomes.component';
import { EditOutcomesComponent } from '../../pages/result-tree/modals/outcomes/edit-outcomes/edit-outcomes.component';
import { CreateOutputsComponent } from '../../pages/result-tree/modals/outputs/create-outputs/create-outputs.component';
import { EditOutputsComponent } from '../../pages/result-tree/modals/outputs/edit-outputs/edit-outputs.component';
import { KraOutputsComponent } from '../../pages/result-tree/modals/outputs/kra-outputs/kra-outputs.component';
import { AddPriorityMdaComponent } from '../../pages/result-tree/modals/prorities/add-priority-mda/add-priority-mda.component';
import { SetupComponent } from '../../pages/result-tree/modals/setup/setup.component';
import { ViewInitiativesComponent } from '../../pages/result-tree/modals/view-initiatives/view-initiatives.component';
import { ViewSubInitiativeComponent } from '../../pages/result-tree/modals/view-sub-initiative/view-sub-initiative.component';
import { SpComponent } from '../../pages/result-tree/sp/sp.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ThirdPartyComponent } from '../../pages/third-party/third-party.component';
import { ThirdPartReportComponent } from '../../pages/third-party/third-part-report/third-part-report.component';
import { PlanModalComponent } from '../../pages/plan-modal/plan-modal.component';
import { MapComponent } from '../../pages/map/map.component';
import { CreateSubOutputComponent } from '../../pages/result-tree/modals/sub-outputs/create-sub-output/create-sub-output.component';
import { EditSubOutputComponent } from '../../pages/result-tree/modals/sub-outputs/edit-sub-output/edit-sub-output.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ProjectUploadModalComponent } from '../../pages/modal/project-upload-modal/project-upload-modal.component';
import { CreateUserComponent } from '../../pages/modal/user/create-user/create-user.component';
import { CrossCuttingComponent } from '../../pages/cross-cutting/cross-cutting.component';
import { AddCcOuputComponent } from '../../pages/cross-cutting/modals/cc-ouputs/add-cc-ouput/add-cc-ouput.component';
import { EditCcOuputComponent } from '../../pages/cross-cutting/modals/cc-ouputs/edit-cc-ouput/edit-cc-ouput.component';
import { ViewCcOuputComponent } from '../../pages/cross-cutting/modals/cc-ouputs/view-cc-ouput/view-cc-ouput.component';
import { BeneficiariesComponent } from '../../pages/beneficiaries/beneficiaries.component';
import { UploadBeneficiariesComponent } from '../../pages/beneficiaries/upload-beneficiaries/upload-beneficiaries.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { EditPdoIndicatorComponent } from '../../pages/result-tree/modals/pdo-indicator/edit-pdo-indicator/edit-pdo-indicator.component';
import { CreatePdoIndicatorComponent } from '../../pages/result-tree/modals/pdo-indicator/create-pdo-indicator/create-pdo-indicator.component';
import { AddSubPdoIndicatorComponent } from '../../pages/result-tree/modals/sub-pdo-indicator/add-sub-pdo-indicator/add-sub-pdo-indicator.component';
import { EditSubPdoIndicatorComponent } from '../../pages/result-tree/modals/sub-pdo-indicator/edit-sub-pdo-indicator/edit-sub-pdo-indicator.component';
import { CrosscuttingissuesComponent } from '../../pages/crosscuttingissues/crosscuttingissues.component';
import { CrosscuttingissuemodalComponent } from '../../pages/crosscuttingissuemodal/crosscuttingissuemodal.component';
import { IoimodalComponent } from '../../pages/ioimodal/ioimodal.component';
import { IoiitemmodalComponent } from '../../pages/ioiitemmodal/ioiitemmodal.component';
import { IntermediateoutcomeComponent } from '../../pages/intermediateoutcome/intermediateoutcome.component';
import { OutputindicatorsComponent } from '../../pages/outputindicators/outputindicators.component';
import { OutputimodalComponent } from '../../pages/outputimodal/outputimodal.component';
import { OutputiresultmodalComponent } from '../../pages/outputiresultmodal/outputiresultmodal.component';
import { YearaddComponent } from '../../pages/yearadd/yearadd.component';
import { QuarteraddComponent } from '../../pages/quarteradd/quarteradd.component';
import { ProjectcategoriesComponent } from '../../pages/projectcategories/projectcategories.component';
import { PcmodalComponent } from '../../pages/pcmodal/pcmodal.component'; 
import { OutputicommentsmodalComponent } from '../../pages/outputicommentsmodal/outputicommentsmodal.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AdminLayoutRoutes),
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      NgxPaginationModule,
      MultiSelectModule,
      PaginatorModule,
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      SweetAlert2Module.forRoot(),
      HighchartsChartModule,
      SelectDropDownModule
    ],
    declarations: [
      AdminLayoutComponent,
      DashboardComponent,
      SettingComponent,
      FiscalComponent,
      TypographyComponent,
      DeliverableComponent,
      ActivityComponent,
      ContractComponent,
      ViewProjectComponent,
      ModalComponent,
      SidebarComponent,
      NavbarComponent,
      DeskOfficerComponent,
      SpotCheckComponent,
      ShortNumberPipe,
      CustomCurrencyPipe,
      TruncatePipe,
      ResultTreeComponent,
      CreateLeadingComponent,
      EditLeadingComponent,
      AssignDeliverableComponent,
      CreateMandateComponent,
      EditMandateComponent,
      MoveComponent,
      CreateOutcomesComponent,
      EditOutcomesComponent,
      CreateOutputsComponent,
      EditOutputsComponent,
      KraOutputsComponent,
      AddPriorityMdaComponent,
      SetupComponent,
      ViewProjectComponent,
      ViewInitiativesComponent,
      ViewSubInitiativeComponent,
      SpComponent,
      ThirdPartyComponent,
      ThirdPartReportComponent,
      PlanModalComponent,
      MapComponent,
      CreateSubOutputComponent,
      EditSubOutputComponent,
      ProjectUploadModalComponent,
      CreateUserComponent,
      CrossCuttingComponent,
      AddCcOuputComponent,
      EditCcOuputComponent,
      ViewCcOuputComponent,
      BeneficiariesComponent,
      UploadBeneficiariesComponent,
      EditPdoIndicatorComponent,
      CreatePdoIndicatorComponent,
      AddSubPdoIndicatorComponent,
      EditSubPdoIndicatorComponent,
      CrosscuttingissuesComponent,
      CrosscuttingissuemodalComponent,
      IoimodalComponent,
      IoiitemmodalComponent,
      IntermediateoutcomeComponent,
      OutputindicatorsComponent,
      OutputimodalComponent,
      OutputiresultmodalComponent,
      YearaddComponent,
      QuarteraddComponent,
      ProjectcategoriesComponent,
      PcmodalComponent,
      OutputicommentsmodalComponent
  ],
})

export class AdminLayoutModule {}

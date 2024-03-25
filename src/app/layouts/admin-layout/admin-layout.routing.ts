import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
// import { UserComponent } from '../../pages/user/user.component';
import { SettingComponent } from '../../pages/setting/setting.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { DeliverableComponent } from '../../pages/deliverable/deliverable.component';
import { ActivityComponent } from '../../pages/activity/activity.component';
import { FiscalComponent } from '../../pages/fiscal/fiscal.component';
import { ContractComponent } from '../../pages/contract/contract.component';
import {ViewProjectComponent} from '../../pages/activity/view-project/view-project.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { DeskOfficerComponent } from '../../pages/desk-officer/desk-officer.component';
import { SpotCheckComponent } from '../../pages/spot-check/spot-check.component';
import { ResultTreeComponent } from '../../pages/result-tree/result-tree.component';
import { ThirdPartyComponent } from '../../pages/third-party/third-party.component';
import { ThirdPartReportComponent } from '../../pages/third-party/third-part-report/third-part-report.component';
import { CrossCuttingComponent } from '../../pages/cross-cutting/cross-cutting.component';
import { BeneficiariesComponent } from '../../pages/beneficiaries/beneficiaries.component';
import { CrosscuttingissuesComponent } from '../../pages/crosscuttingissues/crosscuttingissues.component';
import { IntermediateoutcomeComponent } from '../../pages/intermediateoutcome/intermediateoutcome.component';
import { OutputindicatorsComponent } from '../../pages/outputindicators/outputindicators.component';
import { ProjectcategoriesComponent } from '../../pages/projectcategories/projectcategories.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', component: AdminLayoutComponent, children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'analytics', component: DashboardComponent },
      // { path: 'fiscal', component: UserComponent },
      { path: 'settings', component: SettingComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'gis', component: DeliverableComponent },
      { path: 'activities/:id', component: ActivityComponent },
      { path: 'cross-cutting', component: CrossCuttingComponent },
      { path: 'cross-cutting-issues', component: CrosscuttingissuesComponent },
      { path: 'view-project/:id', component: ViewProjectComponent },
      { path: 'output-management', component: DeskOfficerComponent },
      { path: 'output-indicators', component: OutputindicatorsComponent },
      { path: 'project-categories', component: ProjectcategoriesComponent },
      { path: 'intermediate-output-indicators', component: IntermediateoutcomeComponent },
      { path: 'spot-check', component: SpotCheckComponent },
      { path: 'result-framework', component: ResultTreeComponent },
      { path: 'third-party', component: ThirdPartyComponent },
      { path: 'third-party/project/:id', component: ThirdPartReportComponent },
      { path: 'upgrade', component: FiscalComponent },
      { path: 'beneficiaries', component: BeneficiariesComponent },
      { path: 'contract-nav', component: ContractComponent }
    ] },
];

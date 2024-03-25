import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { UserSidebarComponent } from './user-sidebar.component';



@NgModule({
  imports: [ RouterModule, CommonModule ],
  declarations: [ UserSidebarComponent ],
  exports: [ UserSidebarComponent ]
})
export class UserSidebarModule { }

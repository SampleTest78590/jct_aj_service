import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeadListDetailsComponent } from './lead-list-details/lead-list-details.component';
import { UploadSingleLeadComponent } from './upload-single-lead/upload-single-lead.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomElementsModule } from 'src/app/components/common/shared/custom-elements/custom-elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'lead-list-details',
    component: LeadListDetailsComponent
  },
]

@NgModule({
  declarations: [LeadListDetailsComponent, UploadSingleLeadComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, RouterModule.forChild(routes), CustomElementsModule
  ]
})
export class ManageContactModule { }

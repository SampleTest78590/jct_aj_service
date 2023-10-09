import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ConfirmationPopupComponent } from './confirmation-popup.component';


@NgModule({
  declarations: [
    ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [
    ConfirmationPopupComponent
  ],
  // providers: [DialogRef]
})
export class ConfirmationPopupModule { }

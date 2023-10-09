import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPreviewComponent } from './audio-preview.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [AudioPreviewComponent],
  imports: [
    CommonModule,FormsModule,FlexLayoutModule
  ],
  exports:[AudioPreviewComponent]
})
export class AudioPreviewModule { }

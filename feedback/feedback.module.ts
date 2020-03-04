import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class FeedbackModule { }

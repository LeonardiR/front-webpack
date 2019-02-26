import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

@NgModule({
    declarations: [
        FormComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [FormComponent]
})
export class FormModule { }
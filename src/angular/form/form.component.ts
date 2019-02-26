import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
    public pageTitle = 'Login';
    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.buildLoginForm();
    }

    ngOnInit() {
    }

    buildLoginForm() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    submitForm () {
        if (this.form.valid) {
            console.log(`username: ${this.form.value.username}`, `password: ${this.form.value.password}`);
        }
    }

}
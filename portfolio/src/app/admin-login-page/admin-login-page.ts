import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login-page.html',
  styleUrl: './admin-login-page.css',
})
export class AdminLogin {
    private builder = inject(FormBuilder);

    loginForm = this.builder.group({
        username : ['', Validators.required],
        password : ['', Validators.required] 
    })

    submit(){
        if(this.loginForm.invalid){
            alert("");
        }
        else{
            alert(this.loginForm.value.username+" "+ this.loginForm.value.password);
        }
    }
}
import { Component } from '@angular/core';
import { FormGroup ,FormControl, ReactiveFormsModule } from '@angular/forms';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login-page.html',
  styleUrl: './admin-login-page.css',
})
export class AdminLogin {
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    })

    submit(){
        if(this.loginForm.invalid){
            alert("");
        }
        else{
            alert("works");
        }
    }
}
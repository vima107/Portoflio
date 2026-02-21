import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminLogin } from '../admin-login';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login-page.html',
  styleUrl: './admin-login-page.css',
})
export class AdminLoginPage {
    private builder = inject(FormBuilder);
    private adminLogin = inject(AdminLogin);

    loginForm = this.builder.group({
        username : ['', Validators.required],
        password : ['', Validators.required] 
    })

    submit(){
        if(this.loginForm.valid){
            var result = this.adminLogin.getDetails(this.loginForm.value)
            // .subscribe(
            //    { next: (res)=>{

            //     }
            // }
            // )
        }
        
    }
}
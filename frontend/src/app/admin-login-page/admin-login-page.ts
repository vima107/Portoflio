import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminLoginService } from '../services/admin-login';
import { RedirectCommand, Router } from '@angular/router';
import { UserStateService } from '../services/user-state';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login-page.html',
  styleUrl: './admin-login-page.css',
})
export class AdminLoginPage {
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);
    private adminLogin = inject(AdminLoginService);
    private userState = inject(UserStateService);

    loginForm = this.formBuilder.group({
        username : ['', Validators.required],
        password : ['', Validators.required] 
    })

    submit(){
        if(this.loginForm.valid){
            this.adminLogin.getDetails(this.loginForm.value).subscribe({
                next: (res: any) =>{
                    this.userState.userData = res;  
                    this.router.navigate(['/registeration-page'], {
                    });
                },
                error: (err: any) =>{
                    alert(err.error.messege);
                }
            });
        }
    }
}
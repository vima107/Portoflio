import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { SkillsPage } from './skills-page/skills-page';
import { ContactPage } from './contact-page/contact-page';
import { AdminLoginPage } from './admin-login-page/admin-login-page';

export const routes: Routes = [
    { path:'' ,redirectTo:'/home',pathMatch:'full' },
    { path: 'home-page', component: HomePage },
    { path: 'skills-page', component: SkillsPage },
    { path: 'contact-page', component: ContactPage },
    { path: 'admin-login-page', component: AdminLoginPage}
];

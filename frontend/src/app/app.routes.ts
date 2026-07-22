import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { SkillsPage } from './skills-page/skills-page';
import { ContactPage } from './contact-page/contact-page';
import { AdminLoginPage } from './admin-login-page/admin-login-page';
import { RegisterationPage } from './registeration-page/registeration-page';
import { ProjectsPage } from './projects-page/projects-page';

export const routes: Routes = [
    { path:'' ,redirectTo:'/home',pathMatch:'full' },
    { path: 'portfolio/:slug', component: HomePage },
    { path: 'admin-login-page', component: AdminLoginPage},
    { path: 'registeration-page', component:RegisterationPage }
];

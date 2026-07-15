import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService } from '../services/user-details';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SkillsPage } from "../skills-page/skills-page";
import { ProjectsPage } from "../projects-page/projects-page";
import { ContactPage } from "../contact-page/contact-page";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule,NavigationBar, SkillsPage, ProjectsPage, ContactPage],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
	private route = inject(ActivatedRoute);
  private userDetailsService = inject(UserDetailsService);
  
  slug = '';
  portfolioData = signal<any>(null); // use signal

  ngOnInit(){
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.userDetailsService.getUserDetails(this.slug).subscribe({
      next: (data) => {
        this.portfolioData.set(data); // set signal value
        console.log(this.portfolioData());
      },
      error: (err) => console.log(err)
    });
  }
	
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  imports: [],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  isMobileMenuOpen = false;

  toggleMobileMenu(event: HTMLElement) {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    event.classList.toggle('change', this.isMobileMenuOpen);
  }

  scrollTo(section: string) {
    this.isMobileMenuOpen = false;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}

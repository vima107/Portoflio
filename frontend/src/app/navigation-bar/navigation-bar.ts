import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  hambergerBtnClick(event: HTMLElement) {
    event.classList.toggle('change');
  }

  scrollTo(section: string) {
    console.log('scrolling to', section);
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
}
}

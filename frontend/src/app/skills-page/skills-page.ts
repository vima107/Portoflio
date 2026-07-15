import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills-page',
  imports: [],
  templateUrl: './skills-page.html',
  styleUrl: './skills-page.css',
})
export class SkillsPage {
  @Input() data: any[] = [];
}

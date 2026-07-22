import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skills-page',
  imports: [],
  templateUrl: './skills-page.html',
  styleUrl: './skills-page.css',
})
export class SkillsPage {
  @Input() data: any[] = [];
  
  ngOnChanges(changes: SimpleChanges){
    if(changes['data']){
      console.log(this.data);
    }
  }
}

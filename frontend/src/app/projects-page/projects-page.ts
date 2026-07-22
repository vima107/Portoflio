import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-projects-page',
  imports: [],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
    expandedProjects: boolean[] = [];

    @Input() data: any[] = [];

    ngOnChanges(changes: SimpleChanges){
      if(changes['data']){
        console.log(this.data)
      }
    }

  toggleDescription(index: number) {
    this.expandedProjects[index] = !this.expandedProjects[index];
  }
}

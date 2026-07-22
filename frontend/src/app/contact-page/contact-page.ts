import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
    @Input() data: any[] = [];
    
    ngOnChanges(changes: SimpleChanges){
      if(changes['data']){
        console.log(this.data);
      }
    }

    getContactIcon(type: string): string {

  switch(type.toLowerCase()) {

    case 'github':
      return 'bi bi-github';

    case 'linkedin':
      return 'bi bi-linkedin';

    case 'email':
      return 'bi bi-envelope-fill';

    case 'phone':
      return 'bi bi-telephone-fill';

    case 'instagram':
      return 'bi bi-instagram';

    case 'twitter':
      return 'bi bi-twitter-x';

    default:
      return 'bi bi-link-45deg';
  }

}
}

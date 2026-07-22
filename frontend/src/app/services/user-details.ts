import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
	private http = inject(HttpClient);
	private url ="https://localhost:7018/portfolio/User/";

	getUserDetails(slug: any){
		return this.http.get(`${this.url}${slug}`);
	}

	getSkills(){

	}

	getDescription(){

	}
	getProjets(){

	}

	getContactDetails(){

	}
}

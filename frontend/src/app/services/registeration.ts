import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterationService {
    private http = inject(HttpClient);
    private url = "https://localhost:7018/portfolio/Registeration";

	registerUser(data: any){
		return this.http.post(this.url,data);
	}
}
  
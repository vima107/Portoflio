import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterationService {
    private http = inject(HttpClient);
    private url = "https://portfolio-api-azcrdtcrb3aycsbf.centralus-01.azurewebsites.net/portfolio/Registeration";

	registerUser(data: any){
		return this.http.post(this.url,data);
	}
}

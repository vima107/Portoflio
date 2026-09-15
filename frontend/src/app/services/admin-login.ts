import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
    private http = inject(HttpClient)
    private url="https://portfolio-api-azcrdtcrb3aycsbf.centralus-01.azurewebsites.net/portfolio/AdminLogin";

    getDetails(data: any){
        console.log(data);
        return this.http.post(this.url, data);
    }
}

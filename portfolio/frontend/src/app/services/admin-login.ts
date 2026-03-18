import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
    private http = inject(HttpClient)
    private url="";

    getDetails(data: any){
        console.log(data);
        // return this.http.get(this.url, data);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor(private http: HttpClient) {
    this.getJsonData().subscribe(
      data=>{
        
    },
    error=>{
      console.log("Error to Fatch Data");
      
    });
   }
   getJsonData():Observable<any>{
    return this.http.get('./assets/data.json');
   }
}

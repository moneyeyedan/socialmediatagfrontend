import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  image(data){
    return this.http.post(`${environment.url}/image`,data);
  }
  getImage(){
    return this.http.get(`${environment.url}/listofimage`);
  }
  likePage(id,like){
    return this.http.get(`${environment.url}/likepage/${id}/${like}`);
  }
}

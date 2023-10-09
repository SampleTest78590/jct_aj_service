import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  getToken(){
    const val = sessionStorage.getItem("JFSSO");
    return val ? JSON.parse(val) : null;
  }
}

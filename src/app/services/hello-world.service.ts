import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(private http: HttpClient) { }

  helloWorld() {
    console.log("hit");
    return this.http.get<any>('http://localhost:8181/hello')
  }
}

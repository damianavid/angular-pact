import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(private http: HttpClient) { }

  helloWorld(url: string) {
    console.log("hit");
    const res = this.http.get(url + '/hello')
    return res;
  }
}

import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Monitor {
  url: string;
  color: string;
  responseTime: number;
  status: string;
  errorCode: number;
}

@Component({
  selector: 'app-add-url-component',
  templateUrl: './add-url.component.html'
})
export class AddUrlComponent {


  // constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //   http.get<Monitor[]>(baseUrl + 'monitor').subscribe(result => {
  //     this.monitors = result;
  //   }, error => console.error(error));
  // }
}




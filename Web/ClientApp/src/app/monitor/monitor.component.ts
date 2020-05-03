import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ɵAnimationGroupPlayer } from '@angular/animations';

interface Monitor {
  url: string;
  color: string;
  responseTime: number;
  status: string;
  errorCode: number;
}


@Component({
  selector: 'app-monitor-component',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent implements OnInit {
  public monitors: Monitor[];
  private url: string;

  constructor(private readonly http: HttpClient,  @Inject('BASE_URL')  baseUrl: string, private readonly router: Router) {
    // http.get<Monitor[]>(baseUrl + 'monitor').subscribe(result => {
    //   this.monitors = result;
    // }, error => console.error(error));

    this.url = baseUrl;
  }

  ngOnInit() {
    this.http.get<Monitor[]>(this.url + 'monitor').subscribe(result => {
      this.monitors = result;
    }, error => console.error(error));
  }

  addUrl(): void {

    this.router.navigate(['monitor/addUrl']);
  }
  removeUrl(): void {

    const urls = new Array();
    this.monitors.forEach(monitor => {
      urls.push(monitor.url);
    });
    this.router.navigate(['monitor/removeUrl'], {state: {monitors: urls}});
  }
}




import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { timer, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  subscription: Subscription;
  constructor(private readonly http: HttpClient, @Inject('BASE_URL') baseUrl: string, private readonly router: Router) {
    this.url = baseUrl;
  }
  ngOnInit(): void {

    this.subscription = timer(0, 120000).pipe(
      switchMap(() => this.getMonitors())
    ).subscribe(monitors => this.monitors = monitors);
  }

  addUrl(): void {

    this.router.navigate(['monitor/addUrl']);
  }

  removeUrl(): void {

    const urls = new Array();
    this.monitors.forEach(monitor => {
      urls.push(monitor.url);
    });
    this.router.navigate(['monitor/removeUrl'], { state: { monitors: urls } });
  }

  getMonitors(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.url + 'monitor');
  }
}

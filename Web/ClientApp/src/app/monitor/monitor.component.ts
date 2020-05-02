import { Component } from '@angular/core';

interface Monitor {
  url: string;
  color: string;
  responseTime: number;
  status: string;
  errorCode: number;
}

const COUNTRIES: Monitor[] = [
  {
    url: 'https://google.com.ua',
    color: 'green',
    responseTime: 400,
    status: 'OK',
    errorCode: null
  },
  {
    url: 'https://gmail.com',
    color: 'green',
    responseTime: 200,
    status: 'OK',
    errorCode: null
  },
  {
    url: 'https://reddit.com',
    color: 'yellow',
    responseTime: 2000,
    status: 'SLOW',
    errorCode: null
  },
  {
    url: 'http://gaagle.com.ua',
    color: 'RED',
    responseTime: 0,
    status: 'ERROR',
    errorCode: null
  },
];




@Component({
  selector: 'app-monitor-component',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent {
  public currentCount = 0;
  countries = COUNTRIES;
  public incrementCounter() {
    this.currentCount++;
  }
}



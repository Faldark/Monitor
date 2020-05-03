import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-remove-url-component',
  templateUrl: './remove-url.component.html'
})
export class RemoveUrlComponent implements OnInit {

  public monitors: any;
  constructor(private readonly route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state.monitors)).subscribe(routeData => {
        this.monitors = routeData;
      });
  }
}




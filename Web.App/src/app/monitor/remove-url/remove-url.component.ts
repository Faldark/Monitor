import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-remove-url-component',
  templateUrl: './remove-url.component.html'
})
export class RemoveUrlComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private readonly router: Router) {
    this.url = baseUrl;
  }
  private url: string;
  public monitors: string[];
  isSubmitted = false;
  removeForm = this.fb.group({
    monitorName: ['', [Validators.required]]
  });

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state.monitors)).subscribe(routeData => {
        this.monitors = routeData;
      });
  }

  get monitorName() {
    return this.removeForm.get('monitorName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.removeForm.valid) {
      return false;
    } else {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          url: this.removeForm.get('monitorName').value,
        },
      };
      console.log(options);
      this.http.delete<string>(this.url + 'monitor', options).subscribe(() => {
        this.router.navigate(['']);
      }, error => console.error(error));
    }
  }
}

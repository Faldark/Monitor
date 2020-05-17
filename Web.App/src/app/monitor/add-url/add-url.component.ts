import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

class CsvEntity {
  url: string;
  siteName: string;
  comments: string;
  ownerPhone: string;

}

@Component({
  selector: 'app-add-url-component',
  templateUrl: './add-url.component.html'
})
export class AddUrlComponent {
  public myreg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/;
  addForm = this.fb.group({
    Url: ['', [Validators.required, Validators.pattern(this.myreg)]],
    SiteName: ['', [Validators.required]],
    Comments: ['', [Validators.required]],
    OwnerPhone: ['', [Validators.required]]
  });
  private url: string;


  constructor(private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private readonly router: Router) {
    this.url = baseUrl;
  }

  onSubmit() {
    if (this.addForm.valid) {
      const entity = new CsvEntity();
      entity.comments = this.addForm.get('Comments').value;
      entity.ownerPhone = this.addForm.get('OwnerPhone').value;
      entity.siteName = this.addForm.get('SiteName').value;
      entity.url = this.addForm.get('Url').value;

      this.http.post<CsvEntity>(this.url + 'monitor', entity).subscribe(() => {
        this.router.navigate(['']);
      }, error => console.error(error));
    }
  }
}




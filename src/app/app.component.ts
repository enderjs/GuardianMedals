import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  myType = 'playstation';

  types = [
    { value: 'playstation', viewValue: 'Playstation' },
    { value: 'xbox', viewValue: 'Xbox' },
    { value: 'pc', viewValue: 'PC' }
  ];

  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      'platform': 'playstation',
      'gamertag': ['', Validators.compose([Validators.min(1), Validators.required])],
    });
  }
}

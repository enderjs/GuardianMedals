import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TdFadeInOutAnimation } from "@covalent/core";
import { HttpClient } from "@angular/common/http";


interface DestinyHistoricalStatsDefinition  {
  stats: string[]
}

interface Stat {
  statId: string;
  group: number;
  periodTypes: number[];
  modes: number[];
  category: number;
  statName: string;
  unitType: number;
  unitLabel: string;
  weight: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    TdFadeInOutAnimation(),
  ]
})


export class AppComponent {
  title = 'app';
  apiErrored = false;
  noProfile = false;
  results: string[];

  options: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  createForm(): void {
    this.options = this.fb.group({
      'platform': 'playstation',
      'gamertag': ['', Validators.compose([Validators.min(1), Validators.required])],
    });
  }



  display(): void {
    //this.noProfile = true;
    console.log(this.options.get('platform').value);
    console.log(this.options.get('gamertag').value);

    this.http.get<DestinyHistoricalStatsDefinition>('https://destiny.plumbing/en/raw/DestinyHistoricalStatsDefinition.json').subscribe(data => {
      let keys = [];
      Object.keys(data).forEach(key => {
        keys.push(key);
      });

      //keys.forEach(key => console.log(key));

      keys = keys.filter(key => {
        return /^medal/.test(key);
      });

      console.log(keys);

      keys.forEach(key => {
        console.log('-----------------')
        console.log(data[key].statId);
        console.log(data[key].medalTierIdentifier);
        console.log(data[key].iconImage);
      })
      
    })

  }

  //no icons medalcountdowndefense, medalcontrolperimterkill, medalcontrolcaptureallzones,

}

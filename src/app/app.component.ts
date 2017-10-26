import { Params } from '@angular/router';
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event  } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TdLoadingService } from '@covalent/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/groupBy';
// import 'rxjs/add/operator/mergeAll';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TdFadeInOutAnimation } from '@covalent/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


interface JsonResults {
  stats: string[];
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
  // animations: [
  //   TdFadeInOutAnimation(),
  // ]
})


export class AppComponent {
  title = 'app';

  constructor(router: Router, private loading: TdLoadingService) {
    router.events.
    filter((e: Event) => isStart(e) || isEnd(e))
    .map((e: Event) => isStart(e))
    .distinctUntilChanged()
    .subscribe((showLoader: boolean) => {
      if (showLoader) {
        this.loading.register();
      } else {
        this.loading.resolve();
      }
    });

    function isStart(e: Event): boolean {
      return e instanceof NavigationStart;
    }
    function isEnd(e: Event): boolean {
      return e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError;
    }
  }
  // apiErrored = false;
  // noProfile = false;
  // results: string[];

  // options: FormGroup;

  // constructor(private fb: FormBuilder, private http: HttpClient) {
  //   this.createForm();
  // }

  // createForm(): void {
  //   this.options = this.fb.group({
  //     'platform': 'playstation',
  //     'gamertag': ['', Validators.compose([Validators.min(1), Validators.required])],
  //   });
  // }



  // display(): void {
  //   // this.noProfile = true;
  //   console.log(this.options.get('platform').value);
  //   console.log(this.options.get('gamertag').value);

  //   const myHeaders = new HttpHeaders();
  //   myHeaders.set('X-API-Key', '15f760df0aba46bf99e6c6f1d021e6df');
  //   const myParams = new HttpParams();
  //   myParams.set('groups', '3');

  //   // this.http.get<JsonResults>('')

  //   this.http.get<JsonResults>
  //     ('https://www.bungie.net/Platform/Destiny2/2/Account/4611686018428438090/Stats/',
  //     {
  //       // headers: new HttpHeaders().set('X-API-Key', '15f760df0aba46bf99e6c6f1d021e6df'),
  //       params: new HttpParams().set('groups', '3'),
  //       // reportProgress: true
  //     }).subscribe(data => {
  //       console.log(data);
  //     });


    //  this.http.get<DestinyHistoricalStatsDefinition>
    // ('https://destiny.plumbing/en/raw/DestinyHistoricalStatsDefinition.json').subscribe(data => {
    //   let keys = [];
    //   Object.keys(data).forEach(key => {
    //     keys.push(key);
    //   });

    //   //keys.forEach(key => console.log(key));

    //   keys = keys.filter(key => {
    //     return /^medal/.test(key);
    //   });

    //   console.log(keys);

    //   keys.forEach(key => {
    //     console.log('-----------------')
    //     console.log(data[key].statId);
    //     console.log(data[key].medalTierIdentifier);
    //     console.log(data[key].iconImage);
    //   })

    // });

  //}

  //no icons medalcountdowndefense, medalcontrolperimterkill, medalcontrolcaptureallzones,

}

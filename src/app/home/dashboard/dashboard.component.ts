import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TdFadeInOutAnimation, TdLoadingService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { HttpService } from '../../core/data/http-service';
import { IUserInfoCard } from '../../core/common/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    TdFadeInOutAnimation(),
  ]
})
export class DashboardComponent {

  title = 'app';
  userInfoCard$: Observable<IUserInfoCard>;
  apiErrored = false;
  noProfile = false;
  results: string[];

  options: FormGroup;

  constructor(private fb: FormBuilder, private loading: TdLoadingService, private snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router, private httpService: HttpService) {
    this.createForm();
  }

  createForm(): void {
    this.options = this.fb.group({
      'platform': '2',
      'gamertag': ['', Validators.compose([Validators.min(1), Validators.required])],
    });
  }

  search(): void {

    this.noProfile = false;
    this.apiErrored = false;

    const gamerTag = this.options.get('gamertag').value;
    const platform = this.options.get('platform').value;

    this.loading.register();
    this.userInfoCard$ = this.httpService.searchUser(gamerTag, platform);
    this.userInfoCard$.subscribe(data => {

      if (!data) {
        this.noProfile = true;
      } else {
        this.snackBar.open('Gamertag found. Please wait while Medals are retrieved...', '', { duration: 4000 });
        this.router.navigate(['../profile', platform, data.membershipId], { relativeTo: this.route });
      }

      this.loading.resolve();
    }, (error => {
      this.loading.resolve();
      this.apiErrored = true;
    }));



    // this.http.get<JsonResults>
    //   ('https://www.bungie.net/Platform/Destiny2/2/Account/4611686018428438090/Stats/',
    //   {
    //     // headers: new HttpHeaders().set('X-API-Key', '15f760df0aba46bf99e6c6f1d021e6df'),
    //     params: new HttpParams().set('groups', '3'),
    //     // reportProgress: true
    //   }).subscribe(data => {
    //     console.log(data);
    //   });


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

  }

  // no icons medalcountdowndefense, medalcontrolperimterkill, medalcontrolcaptureallzones,

}

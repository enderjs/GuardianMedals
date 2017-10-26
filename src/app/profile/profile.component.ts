import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/takeUntil';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TdLoadingService, TdCollapseAnimation } from '@covalent/core';

import { MediaChange } from '@angular/flex-layout';
import { ObservableMedia } from '@angular/flex-layout';
import { HttpService } from '../core/data/http-service';
import { IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsDefinition } from '../core/common/interfaces';
import { BungieMembershipType, StatId } from '../core/common/enums';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    TdCollapseAnimation(),
  ]
})
export class ProfileComponent implements OnDestroy, OnInit {

  historicalStatsAccountResult$: Observable<IDestinyHistoricalStatsAccountResult>;
  historicalStatsDefinition$: Observable<IDestinyHistoricalStatsDefinition>;
  ngUnsubscribe: Subject<any> = new Subject<any>();
  membershipId: string;
  membershipType: BungieMembershipType;
  activeTab = 0;
  triggerState = true;

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router,
    private profileService: ProfileService, private loading: TdLoadingService) {
    this.route.params.subscribe(params => {
      this.membershipId = params['memId'];
      this.membershipType = params['memType'];
    });
    this.historicalStatsAccountResult$ = route.data.pluck('medals');
    this.historicalStatsDefinition$ = route.data.pluck('statsDefinition');
  }


  ngOnInit() {
    // this.HistoricalStatsAccountResult$ = this.http.getMedals(this.membershipId, this.membershipType);

    this.historicalStatsDefinition$.zip(this.historicalStatsAccountResult$).takeUntil(this.ngUnsubscribe).subscribe(data => {
      console.log(data);
      this.profileService.historicalStatsDefinition(data[0]);
      this.profileService.medalsAccountResult(data[1]);
      this.router.navigate(['./allmedals'], { relativeTo: this.route });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

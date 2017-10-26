import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { HttpService } from '../../core/data/http-service';
import {
  IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsByPeriod, IDestinyHistoricalStatsValue,
  IDestinyHistoricalStatsDefinition, IDestinyHistoricalStatsPerCharacter
} from '../../core/common/interfaces';
import { BungieMembershipType, StatId } from '../../core/common/enums';

@Component({
  selector: 'app-charactermedals',
  templateUrl: './charactermedals.component.html',
  styleUrls: ['./charactermedals.component.scss']
})
export class CharactermedalsComponent implements OnInit {

  membershipId: string;
  membershipType: BungieMembershipType;
  medalsAccountResult: IDestinyHistoricalStatsAccountResult;
  characters: IDestinyHistoricalStatsPerCharacter[];
  characterCount: number;

  constructor(private http: HttpService, private loading: TdLoadingService, private route: ActivatedRoute,
    private profileService: ProfileService) {
    this.route.params.subscribe(params => {
      this.membershipId = params['memId'];
      this.membershipType = params['memType'];
    });
  }

  ngOnInit() {
    this.medalsAccountResult = this.profileService.medalsAccountResult$.value;
    this.characters = this.medalsAccountResult.characters;
    this.characterCount = this.characters.length;
    // this.http.
  }

}

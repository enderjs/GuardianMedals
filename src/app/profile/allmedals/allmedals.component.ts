import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../services/profile.service';
import {
  IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsByPeriod, IDestinyHistoricalStatsValue, IDestinyHistoricalStatsDefinition
} from '../../core/common/interfaces';
import { StatId } from '../../core/common/enums';

@Component({
  selector: 'app-allmedals',
  templateUrl: './allmedals.component.html',
  styleUrls: ['./allmedals.component.scss']
})
export class AllmedalsComponent implements OnInit {

  medalsAccountResult: IDestinyHistoricalStatsAccountResult;
  medalsData: IDestinyHistoricalStatsByPeriod;
  activitiesEntered: string;
  allMedalsEarned: string;
  medalNames: string[] = [];
  characterCount: number;
  pga: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {

    this.medalsAccountResult = this.profileService.medalsAccountResult$.value;
    console.log(this.medalsAccountResult);
    this.medalsData = this.medalsAccountResult.mergedAllCharacters.merged;
    this.characterCount = this.medalsAccountResult.characters.length;
    this.activitiesEntered = this.medalsData.allTime[StatId.ActivitiesEntered].basic.displayValue;
    this.allMedalsEarned = this.medalsData.allTime[StatId.AllMedalsEarned].basic.displayValue;
    this.pga = this.medalsData.allTime[StatId.AllMedalsEarned].pga.displayValue;

  }

}

import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from '../services/profile.service';
import {
  IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsByPeriod, IDestinyHistoricalStatsValue, IDestinyHistoricalStatsDefinition
} from '../../core/common/interfaces';
import { StatId } from '../../core/common/enums';

@Component({
  selector: 'medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.scss']
})
export class MedalsComponent implements OnInit {

  @Input() medalsAccountResult: IDestinyHistoricalStatsAccountResult;

  // medalsAccountResult: IDestinyHistoricalStatsAccountResult;
  medalsData: IDestinyHistoricalStatsByPeriod;
  activitiesEntered: string;
  statsDefinition: IDestinyHistoricalStatsDefinition;
  allMedalsEarned: string;
  medalNames: string[] = [];
  characterCount: number;
  pga: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {

    this.statsDefinition = this.profileService.historicalStatsDefinition$.value;
    this.medalsData = this.medalsAccountResult.mergedAllCharacters.merged;
    this.characterCount = this.medalsAccountResult.characters.length;
    this.activitiesEntered = this.medalsData.allTime[StatId.ActivitiesEntered].basic.displayValue;
    this.allMedalsEarned = this.medalsData.allTime[StatId.AllMedalsEarned].basic.displayValue;
    this.pga = this.medalsData.allTime[StatId.AllMedalsEarned].pga.displayValue;

    this.medalNames = this.getKeys(this.medalsData.allTime);
    this.medalNames = this.medalNames.filter(key => {
      return /^medal/.test(key);
    });

    this.medalNames = this.medalNames.filter(key => {
      return /\b(?!medalUnknown)\b\S+/.test(key);
    });

    console.log(this.medalNames);
  }

  getKeys(json: Object): string[] {
    const array: string[] = [];

    Object.keys(json).forEach(key => {
      array.push(key);
    });

    return array;

  }


  getDisplayName(medalName: string) {
    const mdName1 = medalName.replace(/medal/i, '');
    const mdName = mdName1.replace(/Ability/i, '');
    return mdName.replace(/([A-Z])/g, ' $1').trim();
  }

  getIconPath(medalName: string): string {

    if (medalName) {
      const iconPath = this.statsDefinition[medalName].iconImage;
      if (iconPath) {
        const iconNameArray = iconPath.split('/');
        const iconName = iconNameArray[iconNameArray.length - 1];
        return `../../../assets/img/icons/${iconName}`;
      } else {
        return '../../../assets/img/icons/icon_m138181644aa3edea7bb7749b10f9750c.png';
      }
    } else {
      return '';
    }
  }

}

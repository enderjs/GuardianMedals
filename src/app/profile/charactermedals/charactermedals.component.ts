import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { TdLoadingService } from '@covalent/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { ProfileService } from '../services/profile.service';
import { HttpService } from '../../core/data/http-service';
import {
  IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsByPeriod, IDestinyHistoricalStatsValue,
  IDestinyHistoricalStatsDefinition, IDestinyHistoricalStatsPerCharacter, IDestinyCharacterComponent
} from '../../core/common/interfaces';
import { BungieMembershipType, StatId, DestinyRace, DestinyClass, DestinyGender } from '../../core/common/enums';
import { DESTINY2_BASE } from '../../../config/api.config';


export interface ICharacterData {
  medalData: IDestinyHistoricalStatsByPeriod;
  profileData: IDestinyCharacterComponent;
}

export class CharacterData implements ICharacterData {
  medalData: IDestinyHistoricalStatsByPeriod;
  profileData: IDestinyCharacterComponent;
  constructor(medalData: IDestinyHistoricalStatsByPeriod, profileData: IDestinyCharacterComponent) {
    this.medalData = medalData;
    this.profileData = profileData;
  }
}

@Component({
  selector: 'app-charactermedals',
  templateUrl: './charactermedals.component.html',
  styleUrls: ['./charactermedals.component.scss']
})

export class CharactermedalsComponent implements OnInit {

  membershipId: string;
  membershipType: BungieMembershipType;
  medalsAccountResult: IDestinyHistoricalStatsAccountResult;
  characterMedalsData: IDestinyHistoricalStatsByPeriod;
  characters: IDestinyHistoricalStatsPerCharacter[];
  charactersId: string[] = [];
  characterCount: number;
  charactersProfile$: Observable<IDestinyCharacterComponent[]>;
  charactersData: ICharacterData[] = [];

  constructor(private http: HttpService, private sanitizer: DomSanitizer, private loading: TdLoadingService, private route: ActivatedRoute,
    private profileService: ProfileService) {
    this.route.parent.params.subscribe(params => {
      this.membershipId = params['memId'];
      this.membershipType = params['memType'];
    });
  }

  ngOnInit() {
    this.medalsAccountResult = this.profileService.medalsAccountResult$.value;
    this.characters = this.medalsAccountResult.characters;
    this.characters.forEach(Character => {
      if (!Character.deleted) {
        this.charactersId.push(Character.characterId);
      }
    });

    this.charactersProfile$ = this.retrieveAllCharacterProfiles(this.charactersId);
    this.charactersProfile$.subscribe(characters => {
      characters.forEach(character => {


        const medals = this.medalsAccountResult.characters
          .filter(characterMedals => characterMedals.characterId === character.characterId)[0].merged;
        const characterDataCombined = new CharacterData(medals, character);
        this.charactersData.push(characterDataCombined);
      });
    });

    console.log(this.charactersData);
  }

  retrieveAllCharacterProfiles(charactersIds: string[]): Observable<IDestinyCharacterComponent[]> {
    const singleObservables = charactersIds.map((characterId: string, urlIndex: number) => {
      return this.http.getCharacter(this.membershipId, this.membershipType, characterId)
        .map(result => result as IDestinyCharacterComponent);

    });

    return Observable.forkJoin(singleObservables);
  }

  getActivitiesEntered(characterMedals: IDestinyHistoricalStatsByPeriod): string {
    return characterMedals.allTime[StatId.ActivitiesEntered].basic.displayValue;
  }

  getMedalsCount(characterMedals: IDestinyHistoricalStatsByPeriod): string {
    if (characterMedals.allTime[StatId.AllMedalsEarned]) {
      return characterMedals.allTime[StatId.AllMedalsEarned].basic.displayValue;
    } else {
      return '0';
    }
  }

  getMedalsPga(characterMedals: IDestinyHistoricalStatsByPeriod): string {
    if (characterMedals.allTime[StatId.AllMedalsEarned]) {
      return characterMedals.allTime[StatId.AllMedalsEarned].pga.displayValue;
    } else {
      return '0';
    }
  }

  getEmblemPath(character: IDestinyCharacterComponent): string {
    return `${DESTINY2_BASE}${character.emblemPath}`;
  }

  getEmblemBackgroundPath(character: IDestinyCharacterComponent): string {
    return `${DESTINY2_BASE}${character.emblemBackgroundPath}`;
  }

  getBackgroundColor(character: IDestinyCharacterComponent): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `rgba(${character.emblemColor.red}, ${character.emblemColor.green},
                        ${character.emblemColor.blue}, ${character.emblemColor.alpha})`);
  }

  getClassRace(character: IDestinyCharacterComponent): string {
    const classType = character.classType;
    const raceType = character.raceType;
    let classString = '';
    let raceString = '';

    switch (classType) {
      case 0:
        classString = 'Titan';
        break;
      case 1:
        classString = 'Hunter';
        break;
      case 2:
        classString = 'Warlock';
        break;
      default:
        classString = 'Unknown';
        break;
    }

    switch (raceType) {
      case 0:
        raceString = 'Human';
        break;
      case 1:
        raceString = 'Awoken';
        break;
      case 2:
        raceString = 'Exo';
        break;
      default:
        raceString = 'Unknown';
        break;
    }

    return `${raceString} ${classString}`;


  }

}

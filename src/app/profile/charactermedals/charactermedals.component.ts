import { Component, OnInit } from '@angular/core';
import { TdLoadingService } from '@covalent/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'

import { ProfileService } from '../services/profile.service';
import { HttpService } from '../../core/data/http-service';
import {
  IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsByPeriod, IDestinyHistoricalStatsValue,
  IDestinyHistoricalStatsDefinition, IDestinyHistoricalStatsPerCharacter, IDestinyCharacterComponent
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
  characterIds: string[] = [];
  characterCount: number;
  characterData$: Observable<IDestinyCharacterComponent[]>;

  constructor(private http: HttpService, private loading: TdLoadingService, private route: ActivatedRoute,
    private profileService: ProfileService) {
    this.route.parent.params.subscribe(params => {
      console.log(params);
      this.membershipId = params['memId'];
      this.membershipType = params['memType'];
    });
  }

  ngOnInit() {
    this.medalsAccountResult = this.profileService.medalsAccountResult$.value;
    this.characters = this.medalsAccountResult.characters;
    this.characters.forEach(Character => {
      this.characterIds.push(Character.characterId);
    });

    this.characterData$ = this.retrieveAllCharacters(this.characterIds);
    this.characterData$.subscribe(data => console.log(data));
  }

  retrieveAllCharacters(characters: string[]): Observable<IDestinyCharacterComponent[]> {
    let singleObservables = characters.map((characterId: string, urlIndex: number) => {
      return this.http.getCharacter(this.membershipId, this.membershipType, characterId)
        .map(result => result as IDestinyCharacterComponent)

    });

    return Observable.forkJoin(singleObservables);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IDestinyHistoricalStatsAccountResult, IDestinyHistoricalStatsDefinition } from '../../core/common/interfaces';

@Injectable()
export class ProfileService {

  medalsAccountResult$: BehaviorSubject<IDestinyHistoricalStatsAccountResult>
  = new BehaviorSubject({} as IDestinyHistoricalStatsAccountResult);

  historicalStatsDefinition$: BehaviorSubject<IDestinyHistoricalStatsDefinition>
  = new BehaviorSubject({} as IDestinyHistoricalStatsDefinition);

  medalsAccountResult(medalsAccountResult: IDestinyHistoricalStatsAccountResult) {
    this.medalsAccountResult$.next(medalsAccountResult);
  }

  historicalStatsDefinition(historicalStatsDefinition: IDestinyHistoricalStatsDefinition) {
    this.historicalStatsDefinition$.next(historicalStatsDefinition);
  }

}

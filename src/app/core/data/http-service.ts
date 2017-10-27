import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DESTINY2_API } from '../../../config/api.config';
import { BungieMembershipType } from '../common/enums';
import {
    IAPIResponse, IUserInfoCard, IDestinyHistoricalStatsAccountResult,
    IDestinyHistoricalStatsDefinition, IDestinyCharacterComponent, ICharacterDataResponse, IDestinyCharacterResponse
} from '../common/interfaces';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    public searchUser(gamertag: string, membershipType: BungieMembershipType): Observable<IUserInfoCard> {

        return this.http.get<IAPIResponse<IUserInfoCard>>(`${DESTINY2_API}/SearchDestinyPlayer/${membershipType}/${gamertag}`)
            .map(result => {
                return result.Response[0];
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    console.log('An error occured', error.error.message);
                } else {
                    console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                }

                Observable.throw(error);
            }
            );
    }

    // https://www.bungie.net/Platform/Destiny2/2/Account/4611686018433391683/Stats/?groups=3
    public getMedals(membershipId: string, membershipType: BungieMembershipType): Observable<IDestinyHistoricalStatsAccountResult> {
        return this.http.get<IAPIResponse<IDestinyHistoricalStatsAccountResult>>
            (`${DESTINY2_API}/${membershipType}/Account/${membershipId}/Stats`, {
                params: new HttpParams().set('groups', '3'),
            }).map(result => {
                return result.Response;
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    console.log('An error occured', error.error.message);
                } else {
                    console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                }

                Observable.throw(error);
            }
            );
    }

    public getHistoricalStatsDefinition(): Observable<IDestinyHistoricalStatsDefinition> {
        return this.http.get<IAPIResponse<IDestinyHistoricalStatsDefinition>>
            (`${DESTINY2_API}/Stats/Definition`).map(result => {
                return result.Response;
            }
            ,
            (error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    console.log('An error occured', error.error.message);
                } else {
                    console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                }

                Observable.throw(error);
            }
            );
    }

    // https://www.bungie.net/Platform/Destiny2/2/Profile/4611686018433391683/Character/2305843009269462722 ?components=200
    public getCharacter(membershipId: string, membershipType: BungieMembershipType, characterId: string)
                                                                                : Observable<IDestinyCharacterComponent> {
        return this.http.get<IAPIResponse<IDestinyCharacterResponse>>
            (`${DESTINY2_API}/${membershipType}/Profile/${membershipId}/Character/${characterId}`, {
                params: new HttpParams().set('components', '200'),
            }).map(result => {
                return result.Response.character.data;
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    console.log('An error occured', error.error.message);
                } else {
                    console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                }

                Observable.throw(error);
            }
            );
    }

}

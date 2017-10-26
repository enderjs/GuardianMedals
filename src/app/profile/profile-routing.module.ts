import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { MedalsComponent } from './medals/medals.component';
import { AllmedalsComponent } from './allmedals/allmedals.component';
import { CharactermedalsComponent } from './charactermedals/charactermedals.component';
import { HttpService } from '../core/data/http-service';
// import { UserAuthGuard } from '../core/services/user-auth-guard.service';
// import { UserSaveChangesGuard } from "../core/services/user-savechangesguard.service";

const profileRoutes: Routes = [
    {
        path: 'profile/:memType/:memId',
        component: ProfileComponent,
        resolve: { medals: 'medalsResolver', statsDefinition: 'statsDefinitionResolver'},
        children: [
            {
                path: 'allmedals',
                component: AllmedalsComponent
            },
            {
                path: 'charactermedals',
                component: CharactermedalsComponent
            }
        ]
    }
];

export function medalsResolver(http: HttpService) {
    return (route: ActivatedRouteSnapshot) => {
        return http.getMedals(route.params['memId'], route.params['memType']);
    };
}

export function statsDefinitionResolver(http: HttpService) {
    return (route: ActivatedRouteSnapshot) => {
        return http.getHistoricalStatsDefinition();
    }
}

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        {
            provide: 'medalsResolver', useFactory: medalsResolver, deps: [HttpService]
        },
        {
            provide: 'statsDefinitionResolver', useFactory: statsDefinitionResolver, deps: [HttpService]
        }
    ]
})
export class ProfileRoutingModule { }

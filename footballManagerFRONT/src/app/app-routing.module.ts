import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPlayersComponent} from "./list-players/list-players.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";
import {PlayerFormComponent} from "./player-form/player-form.component";
import {TeamFormComponent} from "./team-form/team-form.component";
import {RandomMatchComponent} from "./random-match/random-match.component";
import {TeamsPlayersManagementComponent} from "./teams-players-management/teams-players-management.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: 'playerDetails', component: PlayerDetailsComponent },
  { path: '', component: HomeComponent },
  { path: 'TeamsPlayersManagement', component: TeamsPlayersManagementComponent},
  { path: 'randomMatch', component: RandomMatchComponent },
  { path: 'playerForm', component: PlayerFormComponent },
  { path: 'teamForm', component: TeamFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

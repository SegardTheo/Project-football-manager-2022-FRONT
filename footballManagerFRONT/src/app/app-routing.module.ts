import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPlayersComponent} from "./list-players/list-players.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";
import {PlayerFormComponent} from "./player-form/player-form.component";

const routes: Routes = [
  { path: 'playerDetails', component: PlayerDetailsComponent },
  { path: 'playerForm', component: PlayerFormComponent },
  { path: 'playersList', component: ListPlayersComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {Injectable, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPlayersComponent } from './list-players/list-players.component';
import { CommonModule } from '@angular/common';
import { BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms"
import {MatSelectModule} from "@angular/material/select";
import { TeamFormComponent } from './team-form/team-form.component';
import { ListTeamsComponent } from './list-teams/list-teams.component';
import { RandomMatchComponent } from './random-match/random-match.component';
import { TeamsPlayersManagementComponent } from './teams-players-management/teams-players-management.component';
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HomeComponent } from './home/home.component';

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    ListPlayersComponent,
    PlayerDetailsComponent,
    PlayerFormComponent,
    TeamFormComponent,
    ListTeamsComponent,
    RandomMatchComponent,
    TeamsPlayersManagementComponent,
    HomeComponent
  ],
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

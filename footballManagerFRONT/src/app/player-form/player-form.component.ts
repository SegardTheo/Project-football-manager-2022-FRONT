import { Component, OnInit } from '@angular/core';
import {Player, PlayerService} from "../player.service";
import {ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Stats, StatsService} from "../stats.service";
import {Team, TeamService} from "../team.service";

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  playerForm!: FormGroup ;
  player: Player | null = null;
  teamList?: Team[] | null = null;
  stats?: Stats | null = null;
  idPlayer : number | undefined;
  selectedTeam: Team | null = null;

  constructor(private playerService: PlayerService,
              private teamService: TeamService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idPlayer = params['id'];
    });

    this.playerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      strength: [null, [Validators.required]],
      physicalCondition: [null, [Validators.required]],
      defense: [null, [Validators.required]],
      team: [null, [Validators.required]]
    });

    if(this.idPlayer != null)
    {
      // @ts-ignore
      this.playerService.findById(this.idPlayer).subscribe((data)=>{
        this.player = data;

        // @ts-ignore
        this.selectedTeam = this.player.team;

        this.playerForm.patchValue({
          name: this.player?.name,
          description: this.player?.description,
          strength: this.player?.strength,
          physicalCondition: this.player?.physicalCondition,
          defense: this.player?.defense,
          team: this.player?.team
        });
      });
    }

    // @ts-ignore
    this.teamService.getAll().subscribe((data)=>{
      this.teamList = data;
    });
  }

  submit() {
    if (!this.playerForm?.valid ) {
      alert('error');
      return;
    }

    console.log( this.playerForm.value)

    var name = this.playerForm.get("name")?.value;
    var description = this.playerForm.get("description")?.value;
    var strength = this.playerForm.get("strength")?.value;
    var physicalCondition = this.playerForm.get("physicalCondition")?.value;
    var defense = this.playerForm.get("defense")?.value;
    var team = this.playerForm.get("team")?.value;

    var playerJson =
      {
        "name": name,
        "description": description,
        "strength":strength,
        "physicalCondition":physicalCondition,
        "defense":defense,
        "team":"/api/teams/" + team
      };

    if(this.idPlayer != null)
    {
      this.playerService.update(this.idPlayer, playerJson).subscribe((data)=>{
        this.player = data;

        alert("OK");
      });
    } else {
      this.playerService.create(playerJson).subscribe((data)=>{
        this.player = data;

        alert("OK");
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Player, PlayerService} from "../player.service";
import {Team, TeamService} from "../team.service";
import {Stats} from "../stats.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})

export class TeamFormComponent implements OnInit {
  teamForm!: FormGroup ;
  team: Team | null = null;
  idTeam : number | undefined;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idTeam = params['id'];
    });

    this.teamForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });

    if(this.idTeam != null)
    {
      // @ts-ignore
      this.teamService.findById(this.idTeam).subscribe((data)=>{
        this.team = data;

        this.teamForm.patchValue({
          name: this.team?.name
        });
      });
    }
  }

  submit() {
    if (!this.teamForm?.valid ) {
      alert('error');
      return;
    }

    console.log( this.teamForm.value)

    if(this.idTeam != null)
    {
      this.teamService.update(this.idTeam, this.teamForm.value).subscribe((data)=>{
        this.team = data;

        alert("OK");
      });
    } else {
      this.teamService.create(this.teamForm.value).subscribe((data)=>{
        this.team = data;

        alert("OK");
      });
    }
  }
}

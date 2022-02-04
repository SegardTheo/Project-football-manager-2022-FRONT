import { Component, OnInit } from '@angular/core';
import {Player, PlayerService} from "../player.service";
import {ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Stats, StatsService} from "../stats.service";

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  playerForm!: FormGroup ;
  // statsForm!: FormGroup ;
  player?: Player | null = null;
  stats?: Stats | null = null;
  idPlayer : number | undefined;

  constructor(private playerService: PlayerService,
              private statsService: StatsService,
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
      defense: [null, [Validators.required]]
    });
    // this.statsForm = this.formBuilder.group({
    //   strength: [null, [Validators.required]],
    //   physicalCondition: [null, [Validators.required]],
    //   defense: [null, [Validators.required]]
    // });

    if(this.idPlayer != null)
    {

      // @ts-ignore
      this.playerService.findById(this.idPlayer).subscribe((data)=>{
        this.player = data;

        if(this.player?.stats != null)
        {
          // @ts-ignore
          this.statsService.findByUrl(this.player?.stats).subscribe((data)=>{
            this.stats = data;

            this.playerForm.patchValue({
              strength: this.stats?.strength,
              physicalCondition: this.stats?.physicalCondition,
              defense: this.stats?.defense
            });
          });
        }

        this.playerForm.patchValue({
          name: this.player?.name,
          description: this.player?.description,
        });
      });
    }
  }

  submit() {
    if (!this.playerForm?.valid ) {
      return;
    }

    if(this.stats?.id != null)
    {
      // this.statsService.update(this.stats?.id, this.statsForm.value).subscribe((data)=>{
      //   this.stats = data;
      // });
    } else {
      // this.statsService.create(this.statsForm.value).subscribe((data)=>{
      //   this.stats = data;
      //
      //   console.log(data);
      //   console.log(this.stats);
      // });
    }

    if(this.idPlayer != null)
    {
      this.playerService.update(this.idPlayer, this.playerForm.value).subscribe((data)=>{
        this.player = data;
      });
    } else {
      this.playerService.create(this.playerForm.value);
    }
  }
}

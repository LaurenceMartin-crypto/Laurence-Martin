import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ComponentBase } from '../model/ComponentBase';
import { ChannelService } from '../services/channel.service';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-host-screen',
  templateUrl: './host-screen.component.html',
  styleUrls: ['./host-screen.component.css']
})
export class HostScreenComponent extends ComponentBase implements OnInit {
  signal: ChannelService;
  changer: ChangeDetectorRef;
  game: GameService;

  roundLengthInMSeconds: number = 30000;
  timerDisplay: number = this.roundLengthInMSeconds / 1000;
  roundOver: boolean = false;

  urlForCanvas: string = "https://apod.nasa.gov/apod/image/1801/M31Clouds_DLopez_1500.jpg";

  responses : any[] = [
    {
      icon: 'star',
      guess: 'oprah',
      correct: true
    },
    {
      icon: 'circle',
      guess: 'bob dylan',
      correct: false
    },
    {
      icon: 'square',
      guess: 'bill clintno',
      correct: false
    },
    {
      icon: 'darthvader',
      guess: 'james earl jones',
      correct: false
    }
  ]

  constructor(_signal: ChannelService,
              _changer: ChangeDetectorRef,
              _game: GameService) 
    {
      super(_signal, _changer, _game);
    }

  ngOnInit() {
    let timer = Observable.timer(1000, 10);
    timer.subscribe(t => {
      if(this.timerDisplay > 0) {
        // console.log(t);
        this.timerDisplay -= .01;
      } else {
        this.roundOver = true;
      }
    })
  }
}
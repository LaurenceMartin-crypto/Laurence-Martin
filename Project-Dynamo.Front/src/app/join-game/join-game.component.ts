import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService, ChannelEvent } from '../services/channel.service'
import {ComponentBase } from '../model/ComponentBase'
import { GameService } from '../services/game.service';
import { GameModel, PlayerModel } from '../model/GameModel';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent extends ComponentBase implements OnInit {
  code: string;
  routes: Router;
  player: string;

  constructor(private signalr: ChannelService,private chref: ChangeDetectorRef, private gameSrv : GameService, private router : Router) {
    super(signalr,chref,gameSrv);
    this.routes = router;
    this.game.instance = new GameModel();
  
  }

  changeVal(){
    //TODO: if there is no value then break out?
    if(!this.code) return;
    var evt = new ChannelEvent();
    evt.channelName = "JoinGame";
    
    evt.data = { 
      name: this.player ,
      id: this.code
    };
    this.signal.publish(evt);
    this.router.navigate(['/wait']);      
  }

  ngOnInit() {
  }

}

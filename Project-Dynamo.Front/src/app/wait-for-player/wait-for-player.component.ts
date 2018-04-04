import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ChannelService, ChannelEvent } from '../services/channel.service'
import {ComponentBase } from '../model/ComponentBase'
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { PlayerModel, GameModel } from '../model/GameModel';

@Component({
  selector: 'app-wait-for-player',
  templateUrl: './wait-for-player.component.html',
  styleUrls: ['./wait-for-player.component.css']
})
export class WaitForPlayerComponent extends ComponentBase implements OnInit  {
 
  _zone : NgZone;
  items: PlayerModel[] = [];
  routes : Router;
  constructor(private signalr: ChannelService,
              private chref: ChangeDetectorRef,  
              private gameSrv : GameService,
              private zone : NgZone,
              private route : Router) {
      super(signalr,chref,gameSrv);
      this._zone = zone;
      this.routes = route;
      
      /**
       * SETUP SUBSCRIPTIONS
       * this sub is a little different because its subscribing to an observable on the game service so it can catch updates as they come thru
       */
      this.game.gameChanged.subscribe((game: GameModel) =>{
        // this.game.instance.players = game.players;
        this.items = game.playerList;
        this.changer.detectChanges();

        //If we are at the max number of players then roll to the next screen depending on role(host/player)
        if (this.items.length == this.game.instance.maxPlayers) {
          this._zone.run(() => {
            // are you the host?
            if (this.game._isHost)
              this.routes.navigate(['/select']);
            else
              this.routes.navigate(['/player']);
          })
        }
      })
   }

  fuckItLetsGo() {
      // let everyone know that we are gonna bounce then giiit
      this.game.instance.maxPlayers = this.items.length;
      var evt = new ChannelEvent();
      evt.channelName = "UpdateGame";
      evt.data = this.game.instance;
      this.signalr.publish(evt);
  }

  ngOnInit() {
    console.log('running on init')
  }

}

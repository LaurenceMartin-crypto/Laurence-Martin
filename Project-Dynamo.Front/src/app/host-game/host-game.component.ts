import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChannelService, ChannelEvent } from '../services/channel.service'
import { Router } from '@angular/router';
import { GameModel, PlayerModel } from '../model/GameModel';
import {ComponentBase } from '../model/ComponentBase'
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game.component.html',
  styleUrls: ['./host-game.component.css']
})
export class HostGameComponent extends ComponentBase {
  public someVal: any;
  hasCode: boolean = false;

  constructor(private signalr: ChannelService, private chref: ChangeDetectorRef, private gameSrv : GameService) {
    super(signalr,chref, gameSrv);
    /**
     * SETUP SUBSCRIPTIONS
     */
    this.signalr.sub('StartGame').subscribe(
      (x: ChannelEvent) => {
        this.game.instance = x.data;
        this.hasCode = true;
        this.game._isHost = true;
        this.changer.detectChanges();

      });

      // loading up a game instance here and will pass it to hte server for persistance.
      this.game.instance = new GameModel();
  }

  /*
   * Methods
   */
  joinGame() {
    var evt = new ChannelEvent();
    evt.channelName = "StartGame";
    evt.data = this.game.instance;
    this.signalr.publish(evt);
  }

}

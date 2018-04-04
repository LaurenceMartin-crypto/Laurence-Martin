import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { ComponentBase } from '../model/ComponentBase';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : []
})
export class HomeComponent extends ComponentBase implements OnInit {
  showLoader : boolean = true;

  constructor(private signalr:ChannelService,private chref: ChangeDetectorRef, private gameSrv : GameService){
    super(signalr,chref,gameSrv);

    this.signalr.starting$.subscribe(() => {
        this.showLoader = false;
        this.changer.detectChanges();
    })
  }

  callitBack(name,params){
    console.log('RPC call returned in home component', name, params);
  }
  ngOnInit() {
  }
}

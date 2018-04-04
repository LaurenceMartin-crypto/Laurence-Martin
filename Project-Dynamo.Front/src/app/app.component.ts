import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx'
// import { SignalRService } from './services/signal-r.service'
import {ChannelService, ChannelEvent} from "./services/channel.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : []
})
export class AppComponent implements OnInit, AfterViewInit {
  _channels: ChannelService;
  title = 'Project Mayhem';
  constructor(private channels : ChannelService){
    this._channels = channels;
  }

  ngAfterViewInit(): void {
    // this._signalr.startConnection();
    this._channels.start();
  }

  listCallbacks(name,params){
    // console.log( this._signalr.callbacks);
    console.log('RPC call returned in app component', name, params);
  }

  callbacky(data):void{
    console.log('RPC called:' + data);
  }

  ngOnInit(){

  }
}

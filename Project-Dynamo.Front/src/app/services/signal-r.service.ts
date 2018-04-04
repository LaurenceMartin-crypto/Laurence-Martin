import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { GameConfig } from '../model/config'
import { HubConnection } from '@aspnet/signalr';


declare var $:any;
@Injectable()
export class SignalRService {
  hubConnection : HubConnection;
  connected:boolean = false;
  
  constructor() { 
  
  } 

  connect(){
    this.hubConnection = new HubConnection("http://localhost:49369/game");
    

    this.hubConnection.on('OnEvent',(data) => {
      console.log(data);
    });

    this.hubConnection.start().then(() => {
      console.log('connection started.');
      this.hubConnection.invoke('Join');
    });
  }
}

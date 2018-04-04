import { Injectable } from '@angular/core';
import { GameModel, PlayerModel } from '../model/GameModel';
import { ChannelService, ChannelEvent} from '../services/channel.service'
import { Subject } from 'rxjs';


@Injectable()
export class GameService {
  _game: GameModel;
  _isHost: boolean = false;
  gameChanged : Subject<GameModel> = new Subject<GameModel>();
  _channels: ChannelService;
  constructor(private channels : ChannelService) {
    this._channels = channels;

    this._channels.sub('UpdateGame').subscribe( 
      (x: ChannelEvent) => {
       // TODO : update the game with the mappings off this channelEvent
       console.log(`Updating the game in service : ${JSON.stringify(x)}`);
       this._game = x.data;
       this.gameChanged.next(this._game);
    });
  }
  public get instance() : GameModel {
    return this._game;
  }
  public set instance(v : GameModel) {
    this._game = v;
  }
}

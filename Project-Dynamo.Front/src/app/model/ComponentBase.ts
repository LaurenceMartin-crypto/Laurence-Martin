import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChannelService, ChannelEvent } from '../services/channel.service'
import { GameService } from '../services/game.service';

export class ComponentBase {
    signal : ChannelService;
    changer: ChangeDetectorRef;
    game : GameService    
    constructor(private s: ChannelService,private c: ChangeDetectorRef, private g : GameService) {
        this.signal = s;
        this.changer = c;
        this.game = g;
     }
}
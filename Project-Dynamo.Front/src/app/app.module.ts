import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { SignalRService } from './services/signal-r.service';
import { GameService } from './services/game.service';
import { ChannelService,  ChannelConfig, SignalrWindow  } from './services/channel.service';
import { JoinGameComponent } from './join-game/join-game.component'
import { HostGameComponent } from './host-game/host-game.component'

import { GameConfig} from './model/config';
import { WaitForPlayerComponent } from './wait-for-player/wait-for-player.component';
import { ImageSelectComponent } from './image-select/image-select.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerScreenComponent } from './player-screen/player-screen.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { HostScreenComponent } from './host-screen/host-screen.component';
import { SummaryScreenComponent } from './summary-screen/summary-screen.component';
import { RevealImageComponent } from './reveal-image/reveal-image.component';
import { TestingComponent } from './testing/testing.component';

const routes : Route[] = [
  {path: '', component: HomeComponent},
  { path: 'join', component: JoinGameComponent},
  { path: 'host', component: HostGameComponent},
  { path: 'wait', component: WaitForPlayerComponent},
  { path: 'crop', component: ImageCropComponent},
  { path: 'select', component: ImageSelectComponent },
  { path: 'player', component: PlayerScreenComponent },
  { path: 'host-screen', component: HostScreenComponent },
  { path: 'summary', component: SummaryScreenComponent },
  { path: 'reveal-image', component: RevealImageComponent }
]

// let channelConfig = new ChannelConfig();
// channelConfig.url = "http://localhost:9123/signalr";
// channelConfig.hubName = "EventHub";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoinGameComponent,
    HostGameComponent,
    WaitForPlayerComponent,
    ImageSelectComponent,
    PlayerScreenComponent,
    ImageCropComponent,
    HostScreenComponent,
    SummaryScreenComponent,
    RevealImageComponent,
    TestingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SignalRService,  ChannelService, GameService,
    { provide: SignalrWindow, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }

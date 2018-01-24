import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JoinHostScreenComponent } from './join-host-screen/join-host-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinHostScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

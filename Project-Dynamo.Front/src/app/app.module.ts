import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { JoinHostScreenComponent } from './join-host-screen/join-host-screen.component';

const routes: Routes = [
  { path: '', component: JoinHostScreenComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    JoinHostScreenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

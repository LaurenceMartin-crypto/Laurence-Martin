import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JoinHostComponent } from 'join-host-screen/join-host-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { }
const routes: Routes = [
  { path: '', component: JoinHostComponent}
];

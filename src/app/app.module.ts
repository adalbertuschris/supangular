import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiClientsModule } from './api-clients/api-clients.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [BrowserModule, AppRoutingModule, ApiClientsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import {EncodeModule} from "../encode/encode.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EncodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

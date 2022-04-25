import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {EncodePageComponent} from './pages/encode-page/encode-page.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    EncodePageComponent
  ]
})
export class EncodeModule {
}

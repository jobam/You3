import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EncodePageComponent} from "../encode/pages/encode-page/encode-page.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'encode',
    pathMatch: 'full'
  },
  {path: 'encode', component: EncodePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

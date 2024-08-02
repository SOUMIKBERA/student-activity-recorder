import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordControlsComponent } from './record-controls/record-controls.component';
import { ScreenDisplayComponent } from './screen-display/screen-display.component';
import { CameraDisplayComponent } from './camera-display/camera-display.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordControlsComponent,
    ScreenDisplayComponent,
    CameraDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

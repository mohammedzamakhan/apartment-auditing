import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ModalPageComponent } from './modal-page/modal-page.component';

const config = {
  apiKey: 'AIzaSyAMgh1xWLi10mYnS_DFyUzYx-0A1b6508Y',
  authDomain: 'angular-projects-df509.firebaseapp.com',
  databaseURL: 'https://angular-projects-df509.firebaseio.com',
  projectId: 'angular-projects-df509',
  storageBucket: 'angular-projects-df509.appspot.com',
  messagingSenderId: '464056739723'
};

@NgModule({
  declarations: [AppComponent, ModalPageComponent],
  entryComponents: [ModalPageComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyIonicModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  exports: [ ModalPageComponent ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

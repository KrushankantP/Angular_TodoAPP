import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//step 1. add two packages firebase modules from angularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//2. imported environment constant.
import { environment } from '../environments/environment';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    //this TodoComponent autometically added in declaration when we have added a todocomponent into the file.
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //3. initialize the module with the configuration inside the environment
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//next goto index.html

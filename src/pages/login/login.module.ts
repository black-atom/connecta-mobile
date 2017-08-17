import { FormsModule } from '@angular/forms';
import { LoginPage } from './login';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormsModule
  ],
  entryComponents: [
    LoginPage
  ]
})
export class LoginModule {}

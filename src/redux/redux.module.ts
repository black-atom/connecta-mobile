import { LoginEffects } from '../pages/login/redux/login.effects';
import { reducer } from './reducers';
import { AtendimentoEffects } from './effects/atendimentos';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';



@NgModule({
  imports:[
    EffectsModule.forRoot([AtendimentoEffects, LoginEffects]),
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
  ]
})
export class ReduxModule { }

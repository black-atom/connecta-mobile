import { reducer } from './reducers';
import { persistDBEffects } from './effects/persistState';
import { AtendimentoEffects } from './effects/atendimentos';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';



@NgModule({
  imports:[
    EffectsModule.run(AtendimentoEffects),
    EffectsModule.run(persistDBEffects),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
  ]
})
export class ReduxModule { }

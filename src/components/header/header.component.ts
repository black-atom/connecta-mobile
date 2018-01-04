import { Component, OnInit } from '@angular/core'
import { ToastController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Funcionario } from '../../models/funcionario';

import { Store } from '@ngrx/store';
import { AppState } from '../../redux/reducers';
import { NavController } from 'ionic-angular/navigation/nav-controller';


@Component({
    templateUrl: 'header.html',
    selector: 'header'
})

export class HeaderComponent implements OnInit {
    constructor(
        private store:Store<AppState>,
        private navController:NavController
    ){}

    funcionario: Funcionario;
    uploadingPhotos: boolean = false;
    nImagensParaUpload$: Observable<number>;
  
    ngOnInit() {
        this.store.select(state => state.login.funcionario)
        .subscribe(funcionario => this.funcionario = funcionario);
    }
}


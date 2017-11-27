import { Chamado } from './socket-io';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import * as socketio from 'socket.io-client';

import 'rxjs/add/operator/map';

export interface Chamado{
  _id: string;
  cliente: string;
}


@Injectable()
export class SocketIoProvider {
  private socket: any;
  private connected$ = new BehaviorSubject<boolean>(false);

  constructor(){
    this.socket = socketio("http://localhost:3000", {});
    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
    this.emit("registraFuncionario", {oi: "hello"})
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }

}

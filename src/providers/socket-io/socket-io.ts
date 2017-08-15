import { Chamado } from './socket-io';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

export interface Chamado{
  _id: string;
  cliente: string;
}


@Injectable()
export class SocketIoProvider {
  private url = 'http://192.168.43.158:3000';
  private socket;
  private chamadoSubj = new Subject<Chamado[]>();
  private tecnico = {
    _id: 321321321,
    nome: "vitor silva lima"
  }
  constructor() {
    console.log('Hello SocketIoProvider Provider');

    this.socket = io(this.url);
    this.socket.on('connect', () => {
      console.log(this.socket.id); // 'G5p5...'
      this.socket.emit("registra-tecnico", this.tecnico);

      this.socket.on('hello', (data) => {
        console.dir(data);
      })

      //this.socket.emit("connectUser",{username:"vlima"});
    });

    this.socket.on('chamado', (data:Chamado[]) => {
        console.log(data);
        //this.chamadoSubj.next(data);
    });
  }

  getChamados(): Observable<Chamado[]>{
      // const observable = new Observable<Chamado[]>((observer:any) => {
      //     this.socket.on('chamados', (data:Chamado) => {
      //         console.log(data);
      //         observer.next(data);
      //     });
      //     // Any cleanup logic might go here
      //     return function () {
      //       console.log('disposed');
      //     }
      // });

      return this.chamadoSubj;
  }

}

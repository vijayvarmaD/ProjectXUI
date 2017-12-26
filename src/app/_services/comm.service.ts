import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class CommService {
    private url = 'https://eatup-api.herokuapp.com';
    private token = null;
    private socket = null;

    connect2Server() {
      this.token = JSON.parse(localStorage.getItem('currentUser')).token;
      this.socket = io.connect(this.url, { query: 'token=' + this.token });
    }

    sendMessage(message) {
      this.socket.emit('add-message', message);
    }

    getMessages() {
        const observable = new Observable(observer => {
          this.token = JSON.parse(localStorage.getItem('currentUser')).token;
            this.socket.on('order', (data) => {
              observer.next(data);
            });
            this.socket.on('giii', (data) => {
              observer.next(data);
            });
            return () => {
              this.socket.disconnect();
            };
          });
          return observable;
    }

    newOrderNotifcation() {
      const observable = new Observable(observer => {
        this.socket.on('new-order-alert', (data) => {
          observer.next(data);
        });
      });
      return observable;
    }
}

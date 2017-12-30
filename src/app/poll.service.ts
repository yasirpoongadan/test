import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Poll } from './poll';
import * as socketIo from 'socket.io-client';

@Injectable()
export class PollService {
  private _getUrl = '/api/polls';
  private _postUrl = '/api/poll';
  private _putUrl = '/api/poll/';
  private socket: any; 
  constructor(private _http: Http) { 
   // this.socket = io();
    this.socket  = socketIo('http://localhost:3002');
  }

  getPolls(){
    return this._http.get(this._getUrl).map((response: Response) =>
      response.json()
    
    )
  }
  getPoll(poll : any){
    return this._http.get(this._getUrl +'/'+ poll._id).map((response: Response) =>
      response.json()
    
    )
  }

  // getPoll1(data1) {
  //   let observable = new Observable(observer => {
  //     this.socket.on('vote', (data) => {
  //       //console.log('server emit recived ' + this._getUrl +'/'+ data1);
  //       this._http.get(this._getUrl +'/'+ data1).map((response: Response) =>{
  //         //     response.json()
  //         console.log(response);
  //         observer.next(response.json())
  //       })    
  //     });
      
  //   })     
  //   return observable;
  // } 

  addPollAnswer(poll : any){
      // let headers = new Headers({'Content-Type' : 'application/json'});
      // let Options = new RequestOptions({headers : headers});
      // return this._http.put(this._putUrl + poll._id, JSON.stringify(poll),Options)
      // .map((response : Response) => response.json());
      console.log("socket start to emit");
      this.socket.emit('savePoll', poll);
     // console.log("socket start to emited");
  }

  addPoll(poll : any){
    let headers = new Headers({'Content-Type' : 'application/json'});
    let Options = new RequestOptions({headers : headers});
    return this._http.post(this._postUrl, JSON.stringify(poll),Options)
    .map((response : Response) => response.json());
  }


}

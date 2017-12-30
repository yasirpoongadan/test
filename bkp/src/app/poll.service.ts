import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class PollService {
  private _getUrl = '/api/polls';
  private _postUrl = '/api/polls';
  constructor(private _http: Http) { }

  getPolls(){
    return this._http.get(this._getUrl).map((response: Response) =>
      response.json()
    
    )
  }

  addPollAnswer(ans){

  }

}

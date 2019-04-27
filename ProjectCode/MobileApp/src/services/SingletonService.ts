import { Injectable } from '@angular/core';

@Injectable()
export class SingletonService {
  public sessionKey:string = '';

  // public void setSessionKey(s){
  //   this.sessionKey = s;
  // }
  //
  // public string getSessionKey(){
  //   return this.sessionKey;
  // }
}

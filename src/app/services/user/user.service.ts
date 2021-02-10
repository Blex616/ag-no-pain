import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Functions } from '../../../utils/functions'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private functions: Functions) { }

  login(paramsUrl?: any, paramsRequest?: any) {
    return this.httpClient.post<any>(this.functions.urlWhithParams('user/login', environment.urlServer, paramsUrl), paramsRequest, { })
  }

  saveUser(paramsUrl?: any, paramsRequest?: any) {
    let headers = new HttpHeaders({ 'Authorization': this.functions.getJwtWithKey() });
    return this.httpClient.post<any>(this.functions.urlWhithParams('user/save', environment.urlServer, paramsUrl), paramsRequest, { headers })
  }

  users(paramsUrl?: any) {
    let headers = new HttpHeaders({ 'Authorization': this.functions.getJwtWithKey() });
    return this.httpClient.get<any>(this.functions.urlWhithParams('users', environment.urlServer, paramsUrl), { headers })
  }

  usersHquarter(paramsUrl?: any) {
    let headers = new HttpHeaders({ 'Authorization': this.functions.getJwtWithKey() });
    return this.httpClient.get<any>(this.functions.urlWhithParams('users/hquarter', environment.urlServer, paramsUrl), { headers })
  }

  userById(paramsUrl?: any) {
    let headers = new HttpHeaders({ 'Authorization': this.functions.getJwtWithKey() });
    return this.httpClient.get<any>(this.functions.urlWhithParams('user/getuser', environment.urlServer, paramsUrl), { headers })
  }

}

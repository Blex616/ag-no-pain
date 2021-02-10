import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Functions } from '../../../utils/functions'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HquarterService {

  constructor(private httpClient: HttpClient, private functions: Functions) { }

  hquarters(paramsUrl?: any) {
    let headers = new HttpHeaders({ 'Authorization': this.functions.getJwtWithKey() });
    return this.httpClient.get<any>(this.functions.urlWhithParams('headquarters', environment.urlServer, paramsUrl), { headers })
  }

  hquartersCity(paramsUrl?: any) {
    let headers = new HttpHeaders({ 'Authorization': this.functions.getJwtWithKey() });
    return this.httpClient.get<any>(this.functions.urlWhithParams('headquarter/city', environment.urlServer, paramsUrl), { headers })
  }

  saveHquarter(paramsUrl?: any, paramsRequest?: any) {
    let headers = new HttpHeaders({ 'Authorization': this.functions.getJwtWithKey() });
    return this.httpClient.post<any>(this.functions.urlWhithParams('headquarter/save', environment.urlServer, paramsUrl), paramsRequest, { headers })
  }
}

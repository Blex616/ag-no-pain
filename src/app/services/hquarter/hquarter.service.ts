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
}

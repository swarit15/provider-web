import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_ACCESS_TOKEN } from '../common/pc-constants';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getHeaderWithParams(params: HttpParams) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params,
    }
  }

  getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem(LOGIN_ACCESS_TOKEN),
      })
    }
  }

  getImgHeader() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem(LOGIN_ACCESS_TOKEN),
      })
    }
  }
}

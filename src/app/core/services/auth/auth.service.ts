import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from '../../models/auth.models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiResponse } from '../../models/api.responses';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
import { environment } from '../../../../environments/environment';
import { LOCAL_STORAGE_CUR_USER, LOGIN_ACCESS_TOKEN } from '../../common/pc-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<ApiResponse>;
  private currentUserSub: BehaviorSubject<ApiResponse>;

  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private headerService: HeaderService,
  ) {
    this.currentUserSub = new BehaviorSubject<ApiResponse>(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_CUR_USER)!)
    );
    this.currentUser = this.currentUserSub.asObservable();
  }

  public get currentUserValue(): ApiResponse {
    return this.currentUserSub.value;
  }

  private saveInfo(apiResponse: ApiResponse) {
    this.currentUserSub.next(apiResponse);
    localStorage.setItem(LOGIN_ACCESS_TOKEN, apiResponse?.response?.token);
    localStorage.setItem(LOCAL_STORAGE_CUR_USER, JSON.stringify(apiResponse));
  }

  register(registerRequest: RegisterRequest): Observable<Promise<ApiResponse>> {

    const requestUrl = this.url+'auth/provider-register';
    return this.http.post<any>(
      requestUrl, registerRequest, this.headerService.getHeader(),
    );
  }

  login(logInRequest: LoginRequest): Observable<Promise<ApiResponse>> {
    //http://localhost:8080/pc/auth/login
    const requestUrl = this.url+'auth/login';
    return this.http.post<any>(
      requestUrl, logInRequest, this.headerService.getHeader(),
    ).pipe(
      map((apiResponse: ApiResponse): ApiResponse => {
        if (apiResponse && apiResponse.response?.token) {
          this.saveInfo(apiResponse);
        }
        return apiResponse;
      }),
      map(
        async(apiResponse: ApiResponse): Promise<ApiResponse> => {
          return apiResponse;
        }
      )
    );
  }

  logoutActions() {
    localStorage.clear();
    this.currentUserSub.unsubscribe();
  }
}

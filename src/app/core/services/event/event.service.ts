import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse, EventRequest, EventsData } from '../../models/api.responses';
import { ROUTER_URLS } from '../../common/router-urls';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private collectionUrl: string = environment.apiUrl+'collection';

  constructor(
    private http: HttpClient,
    private router: Router,
    private headerService: HeaderService,
    private authService: AuthService,
  ) { }

  eventsData: EventsData[] | undefined;

  getEventsData() {
      return this.getUserEvents();
  }

  getUserEvents(): Promise<ApiResponse> {
    const requestUrl = this.collectionUrl+'/collections';
    return this.http.get<any>(
      requestUrl, this.headerService.getAuthHeaders(),
    ).toPromise()
    .catch(this.handleError);
  }

  getEventDesc(collectionName:String): Promise<ApiResponse> {
    const requestUrl = this.collectionUrl+'/description/'+collectionName;
    return this.http.get<any>(
      requestUrl, this.headerService.getAuthHeaders(),
    ).toPromise()
      .catch(this.handleError);
  }

  removeEvents(collectionName:String): Promise<ApiResponse> {
    const requestUrl = this.collectionUrl+'/'+collectionName;
    return this.http.delete<any>(
      requestUrl, this.headerService.getAuthHeaders(),
    ).toPromise()
      .catch(this.handleError);
  }


  create(eventRequest:EventRequest): Promise<ApiResponse> {
    const requestUrl = this.collectionUrl;
    return this.http.post<any>(
      requestUrl, eventRequest, this.headerService.getAuthHeaders(),
    ).toPromise()
    .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    if(error.status && error.status === 403) {
      this.authService.logoutActions();
      this.router.navigate([ROUTER_URLS.LOGIN]);
    }
  }
}

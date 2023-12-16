import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {HeaderService} from "../header.service";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  private imageUrl: string = environment.apiUrl+'images'


  constructor(private http: HttpClient,
              private headerService: HeaderService) { }


  uploadImage(formData: FormData): Observable<any> {

    console.log('Uploading Image...')

    return this.http.post<any>(this.imageUrl, formData,  this.headerService.getImgHeader() );
  }

  base64toFile(base64String: string, filename: string, mimeType: string): File {
    const byteCharacters = atob(this.removeDataUrlPrefix(base64String));
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return new File([blob], filename, { type: mimeType });
  }

  removeDataUrlPrefix(dataUrl: string): string {
    const parts = dataUrl.split(',');
    if (parts.length === 2) {
      return parts[1];
    } else {
      console.error('Invalid data URL format');
      return '';
    }
  }
}

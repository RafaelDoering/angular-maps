import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  getAddress(lat: number, lng: number) {
    return this.httpClient
      .get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        lat + ',' + lng +
        '&result_type=street_address&key=API_KEY')
      .pipe(
        map(res => this.formatGetAddress(res))
      );
  }

  private formatGetAddress(res) {
    return res;
  }

  constructor(private httpClient: HttpClient) { }
}

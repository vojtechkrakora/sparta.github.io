import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalResultsService {

  private dataUrl = 'total-results.json';
  private cacheBustingId = new Date().getTime();

  constructor(private http: HttpClient) { }

  getData(firstTime = false): Observable<any[]> {
    if (firstTime) {
      const url = `${this.dataUrl}`;
      console.log("First time data.")
      return this.http.get<any[]>(url);
    } else {
      const url = `${this.dataUrl}?cacheBustingId=${this.cacheBustingId}`;
      return this.http.get<any[]>(url);
    }
  }
}

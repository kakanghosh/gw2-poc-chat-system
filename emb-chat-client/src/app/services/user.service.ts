import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getUsersOfKingdom(kingdomId: number): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(
      `${this.BASE_URL}/users/kingdoms/${kingdomId}`
    );
  }
}

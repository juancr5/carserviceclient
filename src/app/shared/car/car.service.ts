import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {
  removeOwners(selectedOwners: any[]) {
    throw new Error('Method not implemented.');
  }
  public API = '//thawing-chamber-47973.herokuapp.com';
  public CAR_API = this.API + '/cars';

  constructor(private http: HttpClient) {
  }

  // Retorna toda la lista de carros 
  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-cars');
  }

  // Retorna toda la lista de carros por un id especifico
  get(id: string) {
    return this.http.get(this.CAR_API + '/'+ id);
  }

  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.CAR_API, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}

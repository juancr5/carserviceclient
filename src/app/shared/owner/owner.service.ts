import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarService } from '../car/car.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  public API = 'https://thawing-chamber-47973.herokuapp.com/owners';
  public API_SEARCH = this.API + '/search/findByDni?dni=';


  constructor(private http: HttpClient,
    private carService: CarService) { }

  getAllOwners() : Observable<any> {
    return this.http.get<any>(this.API);
  }

  getOwnerByDni(dni) : Observable<any> {
    const newAPI = this.API_SEARCH + dni;
    return this.http.get<any>(newAPI);
  }

  saveOwner(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.API, owner);
    }
    return result;
  }

  deleteOwnerByHref(href: any): Observable<any> {
    return this.http.delete<any>(href);
  }

  removeRelation(dni) {
    this.carService.getAll().subscribe(data => {

      const cars = data;

      for (let car of cars) {
        if (car.ownerDni == dni) {
          car.ownerDni = null;
          this.carService.save(car).subscribe(data => {
            console.log("Relacion eliminada");
          }, error => {
            console.log("No se puede borrar la relación");
          });
        }
      }
    }, error => {
      console.log("No se pueden traer todos los carros");
    });
  }
}

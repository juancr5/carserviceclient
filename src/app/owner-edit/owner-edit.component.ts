import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  owners = [];
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const idOwner = params['id'];

      if (idOwner) {
        this.ownerService.getOwner(idOwner).subscribe(data => {
          if (data._embedded.owners[0]) {
            this.owners = data._embedded.owners;

            for (const owner of this.owners) {
              owner.href = owner._links.owner.href
            }
          } else {
            console.log("No existe el Owner con el dni ingresado");
            this.gotoList();
          }
        }, err => {
          console.log("No se puede conectar con el API");
          this.gotoList();
        })
      } else {
        this.owners.push({});
      }
    });
  }

  saveOwner(form: NgForm) {
    this.ownerService.saveOwner(form).subscribe(result => {
      console.log('Owner creado con éxito');
      alert("Owner creado con éxito");

      if (this.owners.length === 1) {
        this.gotoList();
      }
    }, error => {
      console.log('Error al actualizar o eliminar el usuario');
    })
  }

  deleteOwner(href, index, dni) {
    
    this.ownerService.removeRelation(dni);
    
    this.ownerService.deleteOwnerByHref(href).subscribe(result => {
      this.owners.splice(index, 1);
      console.log('Owner eliminado con éxito');
      if (this.owners.length === 0) {
        this.gotoList();
      }
    }, err => {
      console.log('No se puede borrar el Owner');
    });
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

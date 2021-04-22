import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners = [];
  indexOwners = new Map();

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAllOwners().subscribe(data => {
      this.owners = data._embedded.owners;

      for (const owner of this.owners) {
        owner.href = owner._links.owner.href;
        owner.checked = false;
        owner.visible = true;
      }
    },
      error => {
        console.log('No se puede traer los Owners');
      });
  }

  changeCheckBoxEvent(event, index) {
    if (event.checked === true) {
      this.indexOwners.set(index, index);
    } else {
      this.indexOwners.delete(index);
    }
  }

  deleteOwners() {
    this.indexOwners.forEach(key => {

      const owner = this.owners[key];

      this.ownerService.removeRelation(owner.dni);

      this.ownerService.deleteOwnerByHref(owner.href).subscribe(result => {
        console.log("Owner elimando con éxito");
        this.indexOwners.delete(key);
        owner.checked = false;
        owner.visible = false;
      },
        error => console.log("No se puede elimnar el owner"));
    });
  }
}

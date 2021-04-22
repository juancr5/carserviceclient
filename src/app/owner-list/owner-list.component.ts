import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from  '../shared/car/car.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})

export class OwnerListComponent implements OnInit {
  owners = [];
  selectedOwners = [];
  message : any;

  constructor(private ownerService: OwnerService, private carService : CarService, private router: Router, 
    private route: ActivatedRoute) { 

    }
    
  ngOnInit() {
    this.getOwners()
  }

  // Obtener los Owners  
  getOwners() {
    this.ownerService.getAll().subscribe( data => {
      this.owners = data._embedded.owners;
    })
  }

  getSelectedOwners($event: any[]){
    this.selectedOwners = $event;
  }

  
  removeOwnersFromArray() {
    for (var i=0; i < this.selectedOwners.length; i++){
      for (var j=0; j < this.owners.length; j++){
        if (this.owners[j].dni == this.selectedOwners[i]){
          this.owners.splice(j, 1)
        }
      }
    }
  }

  updateCars(){
    this.carService.removeOwners(this.selectedOwners);
  }

  removeOwners(){
    this.ownerService.removeList(this.selectedOwners);
  }

  removeListOfOwners(){
   if (this.selectedOwners[0]){
    this.updateCars();
    this.removeOwners();
    this.removeOwnersFromArray();
    this.message = "Owners Deleted Succesfully"
   } else {
     this.message = "There are no owners to delete";
   }
  }

}

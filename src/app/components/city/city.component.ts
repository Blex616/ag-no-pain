import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '../../services/city/city.service'
import { Functions } from '../../../utils/functions'
import { City, cityRequires } from '../../models/City'
declare let alertify: any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  citysLoop = []
  cityModel: City;
  cityRequires = cityRequires;

  constructor(private cityService: CityService, private functions: Functions, private router: Router) {
    this.cityModel = {
      "name": ""
    }
  }

  ngOnInit(): void {
    this.cities();
  }

  cities() {
    this.cityService.cities(null).subscribe(res => {
      this.citysLoop = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  saveCity() {
    if (this.functions.requiresIsEmpty(this.cityRequires, this.cityModel)) {
      alertify.error("Por favor llene todos los campos");
    } else {
      this.cityService.saveCity(null, this.cityModel).subscribe(res => {
        this.citysLoop = res.cities;
        alertify.success("Guardado correctamente");
      },
        err => {
          alertify.error(this.functions.validateMessageError(err));
        })
    }
  }

  hquartersCity(city:any) {
    this.router.navigate(['/hquarter', { "city": city }]);
  }

}

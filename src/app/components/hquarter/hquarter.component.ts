import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HquarterService } from '../../services/hquarter/hquarter.service'
import { CityService } from '../../services/city/city.service'
import { Functions } from '../../../utils/functions'
import { Hquarter, hquarterRequires } from '../../models/Hquarter'
declare let alertify: any;

@Component({
  selector: 'app-hquarter',
  templateUrl: './hquarter.component.html',
  styleUrls: ['./hquarter.component.scss']
})
export class HquarterComponent implements OnInit {

  hquartersLoop = []
  citiesModal = []
  filterCity: any;
  userInfo: any;
  modelHquarter: Hquarter;
  hquarterRequires = hquarterRequires;

  constructor(private hquarterService: HquarterService, private cityService: CityService, private functions: Functions, private route: ActivatedRoute, private router: Router) {
    this.userInfo = this.functions.userInfo;
    this.filterCity = this.route.snapshot.paramMap.get("city");
    this.modelHquarter = {
      "name": "",
      "city": ""
    }
  }

  ngOnInit(): void {
    if (this.filterCity) {
      this.hquartersCity(this.filterCity);
    } else {
      this.hquarters();
    }
  }

  hquarters() {
    this.hquarterService.hquarters(null).subscribe(res => {
      this.hquartersLoop = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  hquartersCity(city: any) {
    this.hquarterService.hquartersCity({ 'city': city }).subscribe(res => {
      this.hquartersLoop = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  usersHquarter(hquarter: any) {
    this.router.navigate(['/user', { "hquarter": hquarter, "city": this.filterCity }]);
  }

  showModal(){
    this.cityService.cities(null).subscribe(res => {
      this.citiesModal = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  saveHquarter(){
    if (this.functions.requiresIsEmpty(this.hquarterRequires, this.modelHquarter)) {
      alertify.error("Por favor llene todos los campos");
    } else {
      this.hquarterService.saveHquarter(null, this.modelHquarter).subscribe(res => {
        this.hquartersLoop = res.hquarters;
        alertify.success("Guardado correctamente");
      },
        err => {
          alertify.error(this.functions.validateMessageError(err));
        })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city/city.service'
import { Functions } from '../../../utils/functions'
declare let alertify: any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  citysLoop = []

  constructor(private cityService: CityService, private functions: Functions) { }

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

}

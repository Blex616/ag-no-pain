import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city/city.service'
import { HquarterService } from '../../services/hquarter/hquarter.service'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service'
import { Functions } from '../../../utils/functions'
import { User, userRequires } from '../../models/User'
declare let alertify: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  usersLoop = []
  hquartersLoop = []
  citiesModal = []
  modelUser: User;
  userRequires = userRequires;

  constructor(private userService: UserService, private cityService: CityService, private hquarterService: HquarterService, private functions: Functions, private route: ActivatedRoute, private router: Router) {
    this.modelUser = {
      "identification": '',
      "password": '',
      "firstName": '',
      "lastName": '',
      "role": 'USER'
    };
  }

  ngOnInit(): void {
    let city = this.route.snapshot.paramMap.get("city");
    let hquarter = this.route.snapshot.paramMap.get("hquarter");
    if (city && hquarter){
      this.usersHquarter(city, hquarter);
    }else{
      this.users();
    }
  }

  users(){
    this.userService.users(null).subscribe(res => {
      this.usersLoop = res;
      console.log(res)
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  usersHquarter(city: any, hquarter: any){
    this.userService.usersHquarter({ 'city': city, 'hquarter': hquarter}).subscribe(res => {
      this.usersLoop = res;
      console.log(res)
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  showModal(){
    this.cityService.cities(null).subscribe(res => {
      this.citiesModal = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  getHquarters(city: any){
    this.hquarterService.hquartersCity({ 'city': city.value }).subscribe(res => {
      this.hquartersLoop = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  saveUser(){
    if (this.functions.requiresIsEmpty(this.userRequires, this.modelUser)) {
      alertify.error("Por favor llene todos los campos");
    } else {
      this.userService.saveUser(null, this.modelUser).subscribe(res => {
        this.usersLoop = res.users;
        this.modelUser = {
          "identification": '',
          "password": '',
          "firstName": '',
          "lastName": '',
          "role": 'USER'
        };
        alertify.success("Guardado correctamente");
      },
        err => {
          alertify.error(this.functions.validateMessageError(err));
        })
    }
  }

}

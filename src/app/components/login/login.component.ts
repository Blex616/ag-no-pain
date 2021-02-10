import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component'
import { Router } from '@angular/router';
import { CityService } from '../../services/city/city.service'
import { HquarterService } from '../../services/hquarter/hquarter.service'
import { UserService } from '../../services/user/user.service'
import { Functions } from '../../../utils/functions'
import { User, userRequires } from '../../models/User'
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  citiesModal = [];
  hquartersLoop = [];
  identification = '';
  password = '';
  firstName = '';
  lastName = '';
  userInfo: any;
  modelUser: User;
  userRequires = userRequires;

  constructor(private userService: UserService, private cityService: CityService, private hquarterService: HquarterService, private functions: Functions, private app: AppComponent, private router: Router) {
    this.modelUser = {
      "identification": '',
      "password": '',
      "firstName": '',
      "lastName": '',
      "role": 'USER'
    };
  }

  ngOnInit(): void {
  }

  login() {
    let paramsRequest = {
      "identification": this.identification,
      "password": this.password
    }
    if (this.identification && this.password) {
      this.userService.login(null, paramsRequest).subscribe(res => {
        this.functions.saveToken(res.accessToken);
        this.app.showOption = true;
        this.app.ngOnInit();
        this.functions.checkUserInfo();
        this.userInfo = this.functions.decodedJwt(res.accessToken)
        this.router.navigate(['/hquarter']);
        alertify.success('Bienvenido');
      },
        err => {
          alertify.error(this.functions.validateMessageError(err));
        })
    } else {
      alertify.warning('Ningun campo debe ir vacio');
    }
  }

  showModal() {
    this.cityService.cities(null).subscribe(res => {
      this.citiesModal = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  getHquarters(city: any) {
    this.modelUser.headquarter = undefined;
    this.hquarterService.hquartersCity({ 'city': city.value }).subscribe(res => {
      this.hquartersLoop = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

  register() {
    if (this.functions.requiresIsEmpty(this.userRequires, this.modelUser)) {
      alertify.error("Por favor llene todos los campos");
    }else{
      this.userService.saveUser(null, this.modelUser).subscribe(res => {
        this.identification = this.modelUser.identification;
        this.password = this.modelUser.password;
        this.login()
      },
        err => {
          alertify.error(this.functions.validateMessageError(err));
        })
    }
  }

}

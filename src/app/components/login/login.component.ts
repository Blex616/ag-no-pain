import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component'
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service'
import { Functions } from '../../../utils/functions'
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  identification = '';
  password = '';
  firstName = '';
  lastName = '';
  userInfo: any;

  constructor(private userService: UserService, private functions: Functions, private app: AppComponent, private router: Router) { }

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

  register() {
    let paramsRequest = {
      "identification": this.identification,
      "password": this.password,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "role": "USER"
    }
    this.userService.saveUser(null, paramsRequest).subscribe(res => {
      this.login()
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

}

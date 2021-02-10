import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Functions } from '../utils/functions'
declare let alertify: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ag-no-pain';
  showOption = true;
  userInfo: any = {};
  authorization = '';

  constructor(private router: Router, private functions: Functions) { }

  ngOnInit(): void {
    this.checkLogin();
    this.authorization = this.functions.authorization();
    this.userInfo = this.authorization ? this.functions.decodedJwt(this.authorization) : {}
    console.log(this.showOption)
    console.log(this.userInfo)
  }

  logout() {
    localStorage.clear();
    this.showOption = false;
    this.router.navigate(['/login']);
    alertify.success('Hasta luego');
  }

  checkLogin() {
    if (this.functions.authorization()) {
      this.router.navigate(['/hquarter']);
    } else {
      this.showOption = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service'
import { Functions } from '../../../utils/functions'
declare let alertify: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  usersLoop = []

  constructor(private userService: UserService, private functions: Functions) { }

  ngOnInit(): void {
    this.users();
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

}

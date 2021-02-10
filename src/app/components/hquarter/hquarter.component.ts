import { Component, OnInit } from '@angular/core';
import { HquarterService } from '../../services/hquarter/hquarter.service'
import { Functions } from '../../../utils/functions'
declare let alertify: any;

@Component({
  selector: 'app-hquarter',
  templateUrl: './hquarter.component.html',
  styleUrls: ['./hquarter.component.scss']
})
export class HquarterComponent implements OnInit {

  hquartersLoop = []
  userInfo:any;
  
  constructor(private hquarterService: HquarterService, private functions: Functions) {
    this.userInfo = this.functions.userInfo;
   }

  ngOnInit(): void {
    this.hquarters();
  }

  hquarters(){
    this.hquarterService.hquarters(null).subscribe(res => {
      this.hquartersLoop = res;
    },
      err => {
        alertify.error(this.functions.validateMessageError(err));
      })
  }

}

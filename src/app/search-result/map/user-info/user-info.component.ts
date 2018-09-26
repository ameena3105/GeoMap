import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

export interface Coordinates {
  lat: number;
  lng: number;
  type: string;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  phone: any;
  @Input('userData') userData: Coordinates[] = new Array<Coordinates>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.userData){
      //this.userData = changes.filterData.currentValue;
      this.phone = 'test';
    }
    //this.phone = this.filterData.type; 
  }
  
}

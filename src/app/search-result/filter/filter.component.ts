import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {default as CountryData}  from '../../Resources/countries';
import {AppSettingsService} from '../../common/app-service.service'

export interface Countries {
  lat: number;
  lng: number;
  name: string;
}


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  
  countryCtrl = new FormControl();
  phoneTypes = new FormControl();
  countryArray:Array<string>;
  countries: Countries[] = CountryData;
  phones : string[] = ['iPhone 5s', 'iPhone 6', 'iPhone 6s', 'iPhone 7', 'iPhone 7 Plus', 'iPhone X'];

  
  //@ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  
  constructor(private appSettingService: AppSettingsService) {
  }

  ngOnInit() {
  
  }

  countryFilter(){
    let countrylatlng:any={};
    countrylatlng.lat = this.countryCtrl.value.lat;
    countrylatlng.lng = this.countryCtrl.value.lng;
    this.appSettingService.setCountryData(countrylatlng);
  }

  phoneFilter(){
    
  }
}

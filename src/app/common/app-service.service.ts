import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private country = new BehaviorSubject('');
  countryData = this.country.asObservable();
  private phone = new BehaviorSubject('');
  phoneData = this.phone.asObservable();
  constructor() { }

  setCountryData(country: any){
    this.country.next(country);
  }

  setPhoneData(phone: any){
    this.phone.next(phone);
  }
}

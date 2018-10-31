import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LocationService } from '../location.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  lat = -22.012437700000003;
  lng = -47.8971016;

  loginForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(254)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(254)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(254)]],
  });

  addressForm = this.fb.group({
    street: ['', Validators.required],
    number: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required]
  });

  consoleLog() {
    console.log(this.loginForm.controls.password.invalid);
  }

  onSubmit() {
    console.log(this.loginForm.value);
    console.log(this.addressForm.value);
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.setAddress();
      });
    } else {
      alert('Seu navegador não tem suporte a geolocalização.');
    }
  }

  onMapClick(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.setAddress();
  }

  setAddress() {
    this.locationSevice.getAddress(this.lat, this.lng).subscribe((res) => {
      if (res.status === 'OK') {
        let street, number, city, state, country;
        res.results[0].address_components.forEach(function (item) {
          if (item.types.includes('route')) {
            street = item.long_name;
          }
          if (item.types.includes('street_number')) {
            number = item.long_name;
          }
          if (item.types.includes('administrative_area_level_2')) {
            city = item.long_name;
          }
          if (item.types.includes('administrative_area_level_1')) {
            state = item.long_name;
          }
          if (item.types.includes('country')) {
            country = item.long_name;
          }
        });

        this.addressForm.patchValue({
          street: street,
          number: number,
          city: city,
          state: state,
          country: country
        });
      }
    });
  }

  constructor(private fb: FormBuilder, private locationSevice: LocationService) { }
}

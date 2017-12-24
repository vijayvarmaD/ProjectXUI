import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommService } from '../_services/comm.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = { 'role': 'CUSTOMER'};
  loading = false;
  error = '';

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private comms: CommService
    ) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.phoneNo, this.model.password, this.model.role)
          .subscribe(result => {
              if (result.success === true) {
                  if (result.role === 'VENDOR') {
                    NavbarComponent.updateUserStatus.next(true);
                    this.router.navigate(['/vendor/home']);
                  } else if (result.role === 'CUSTOMER') {
                    NavbarComponent.updateUserStatus.next(true);
                    this.router.navigate(['/customer/home']);
                  } else if (result.role === 'DELIVERY') {
                    NavbarComponent.updateUserStatus.next(true);
                    this.router.navigate(['/delivery/home']);
                  }
                  // login successful
                //   this.router.navigate(['/home']);
                this.comms.connect2Server();
              } else {
                  // login failed
                  this.error = 'Username or password is incorrect';
                  this.loading = false;
              }
          });
  }
}

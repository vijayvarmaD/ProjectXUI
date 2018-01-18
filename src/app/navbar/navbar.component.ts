import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { CommService } from '../_services/comm.service';

@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent implements OnInit {
    public static updateUserStatus: Subject<boolean> = new Subject();
    public static updateUserStatusLogout: Subject<boolean> = new Subject();
    public static updateAlertBox: Subject<string> = new Subject();
    @Input() public role: string;
    loginStatus: boolean;
    alertArray: any;
    alertCounter = 0;
    tId: any;
    showCounter = false;

    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private comms: CommService
    ) {
      // Default Login Status
      this.loginStatus = false;

      // navbar - change role value - login
      NavbarComponent.updateUserStatus.subscribe(res => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        this.role = user.role;
        this.loginStatus = true;
      });

      // navbar - change role value - logout
      NavbarComponent.updateUserStatusLogout.subscribe(res => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user == null) {
          this.role = '';
          this.loginStatus = false;
        }
      });

      NavbarComponent.updateAlertBox.subscribe(data => {
        // this.alertArray = data.transactionId;
        this.alertCounter++;
        this.NotificationController(data);
        if (this.alertCounter > 0) {
          this.showCounter = true;
        }
      });
    }

    ngOnInit() {

    }

    NotificationController(data) {
      console.log(data);
      this.alertArray = data.transactionId;
    }
  }
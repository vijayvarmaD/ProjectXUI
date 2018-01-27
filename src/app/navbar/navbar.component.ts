import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';

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
    alertArray: String[] = [];
    alertCounter = 0;
    tId: any;

    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute
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
        this.alertCounter++;
        this.NotificationController(data);
      });
    }

    ngOnInit() {

    }

    NotificationController(data) {
      this.alertArray.push(data);
    }

    NotificationViewed() {
      if (this.alertCounter > 0) {
        this.alertCounter--;
      }
    }
  }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/models/configuration.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: string;
  allowRegistration: boolean;

  constructor(private loginService: LoginService, private router: Router, private configurationService: ConfigurationService) { }
  
  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email ?? '';
      }
    });

    this.configurationService.getConfiguration().subscribe(
      (configuration: Configuration) => {
        this.allowRegistration = configuration.allowRegistration ?? false;
      }
    );
  }

  logout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}

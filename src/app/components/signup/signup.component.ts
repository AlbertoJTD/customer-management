import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private loginService: LoginService) { }
  
  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  signup(): void {
    this.loginService.signup(this.email, this.password).then(response => {
      this.router.navigate(['/']);
    }).catch(error => {
      alert('An error has occurred');
    });
  }
}

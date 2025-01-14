import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  login() {
    this.http.post('http://localhost:3000/api/login', { email: this.email, password: this.password })
      .subscribe(
        response => {
          console.log('Login successful', response);

          this.authService.setToken((response as any).token);
          this.router.navigateByUrl("/")
        },
        error => {
          console.error('Login error', error);
          alert("Login Failed")
        }
      );
  }

}

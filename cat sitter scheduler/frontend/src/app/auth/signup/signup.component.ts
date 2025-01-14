import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  signup() {
    if (!this.email || !this.role || !this.password) {
      return alert("All fields are required")
    }

    console.log("Called")

    this.http.post('http://localhost:3000/api/signup', { email: this.email, password: this.password, role: this.role })
      .subscribe(
        response => {console.log('Signup successful', response);

          this.router.navigateByUrl("/login")
        },
        error => {
          console.error('Signup error', error);
          alert("Signup failed")
        }
      );
  }
}

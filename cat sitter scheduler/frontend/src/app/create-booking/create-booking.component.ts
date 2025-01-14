import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-booking',
  imports: [FormsModule, RouterModule],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.scss'
})
export class CreateBookingComponent {
  title: string = '';
  startTime: string = '';
  endTime: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  createBooking() {

    if (!this.title || !this.startTime || !this.endTime) {
      return alert("All fields are required")
    }

    const bookingData = {
      title: this.title,
      startTime: this.startTime,
      endTime: this.endTime,
    };

    this.http
      .post(`http://localhost:3000/api/bookings/create`, bookingData)
      .subscribe(
        (response) => {
          console.log('Booking created:', response);
          this.router.navigate(['/']); // Navigate back to the bookings list
        },
        (error) => {
          console.error('Error creating booking:', error);
          alert("Failed to create booking!")
        }
      );
  }


  bookings() {
    this.router.navigateByUrl("/")
  }
}

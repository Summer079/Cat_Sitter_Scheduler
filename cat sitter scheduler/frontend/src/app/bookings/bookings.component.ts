

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface Booking {
  title: string;
  startTime: string;
  endTime: string;
  id: number;
}

@Component({
  selector: 'app-bookings',
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})

export class BookingsComponent implements OnInit {
  bookings: Booking[] = []; // Mock data for bookings

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
  }


  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.http.get(`http://localhost:3000/api/bookings`).subscribe(
      (response: any) => {
        this.bookings = response.bookings; // Save bookings to local array
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }


  // Navigate to booking details page
  viewBookingDetails(id: number): void {
    this.router.navigate(['/booking-details', id]); // Route to the Booking Details
  }

  // Add new booking
  addBooking(): void {
    this.router.navigate(['/create-booking']); // Navigate to Add Booking
  }

  copyBookingLink(booking: any): void {
    const bookingUrl = `http://localhost:4200/booking-details/${booking.id}`;  // Adjust based on your URL format

    if (navigator.clipboard) {
      navigator.clipboard.writeText(bookingUrl).then(() => {
        alert('Booking link copied to clipboard!');
      }).catch((error) => {
        console.error('Error copying text: ', error);
        alert('Failed to copy the link');
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = bookingUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Booking link copied to clipboard!');
    }
  }


  logout() {
    this.authService.clearToken();
    this.router.navigateByUrl('/login')
  }
}

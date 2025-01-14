import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  standalone: true,
  imports:[CommonModule, FormsModule, RouterModule]
})
export class BookingDetailsComponent implements OnInit {
  bookingId: string | null = null;
  booking: any = null;
  updates: any[] = [];
  videoFile: File | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient,public authService: AuthService) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId) {
      this.fetchBookingDetails();
    }
  }

  fetchBookingDetails(): void {
    this.http.get(`http://localhost:3000/api/bookings/${this.bookingId}`).subscribe(
      (response: any) => {
        this.booking = response.booking;
        this.updates = this.booking.BookingUpdates || [];
      },
      (error) => {
        console.error('Error fetching booking details:', error);
      }
    );
  }

  handleFileInput(event: any): void {
    this.videoFile = event.target.files[0];
  }

  addUpdate(event: Event): void {
    event.preventDefault();

    if (!this.videoFile) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', this.videoFile);

    this.http.post(`http://localhost:3000/api/bookings/${this.bookingId}/update`, formData).subscribe(
      (response: any) => {
        console.log('Update added:', response);
        this.videoFile = null; // Clear the file input
        this.fetchBookingDetails()
      },
      (error) => {
        console.error('Error adding update:', error);
      }
    );
  }
}
